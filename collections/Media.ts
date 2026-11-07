import crypto from "crypto";
import type { CollectionConfig } from "payload";

interface CloudinaryCredentials {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

function getCloudinaryCredentials(): CloudinaryCredentials {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

  if (cloudName && apiKey && apiSecret) {
    return { cloudName, apiKey, apiSecret };
  }

  // Also support CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
  const cloudinaryUrl = process.env.CLOUDINARY_URL?.trim();
  if (cloudinaryUrl?.startsWith("cloudinary://")) {
    try {
      const parsed = new URL(cloudinaryUrl);
      return {
        cloudName: parsed.hostname,
        apiKey: decodeURIComponent(parsed.username),
        apiSecret: decodeURIComponent(parsed.password),
      };
    } catch {
      // Fall through to error
    }
  }

  throw new Error(
    "Faltan las credenciales de Cloudinary. Configura CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en tus variables de entorno."
  );
}

function signCloudinaryParams(
  params: Record<string, string | number>,
  apiSecret: string
): string {
  const serialized = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(`${serialized}${apiSecret}`)
    .digest("hex");
}

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Texto alternativo (Alt)",
    },
    {
      name: "cloudinaryUrl",
      type: "text",
      label: "URL en Cloudinary",
      admin: {
        readOnly: true,
        description: "Se genera automáticamente al subir la imagen a Cloudinary.",
      },
    },
    {
      name: "cloudinaryPublicId",
      type: "text",
      admin: {
        hidden: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        const file = req.file;
        if (!file?.data) {
          return data;
        }

        const { cloudName, apiKey, apiSecret } = getCloudinaryCredentials();
        const timestamp = Math.floor(Date.now() / 1000);
        const folder = process.env.CLOUDINARY_FOLDER?.trim() || "portfolio_v3";

        const rawBaseName = (file.name || "image")
          .replace(/\.[^/.]+$/, "")
          .toLowerCase()
          .replace(/[^a-z0-9-_]+/g, "-")
          .replace(/(^-|-$)/g, "");
        const publicId = `${rawBaseName || "img"}-${timestamp}`;

        const paramsToSign = {
          folder,
          public_id: publicId,
          timestamp,
        };
        const signature = signCloudinaryParams(paramsToSign, apiSecret);

        const mime = file.mimetype || "image/jpeg";
        const base64File = `data:${mime};base64,${file.data.toString("base64")}`;

        const formData = new FormData();
        formData.append("file", base64File);
        formData.append("api_key", apiKey);
        formData.append("timestamp", String(timestamp));
        formData.append("folder", folder);
        formData.append("public_id", publicId);
        formData.append("signature", signature);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadRes.ok) {
          const errText = await uploadRes.text();
          throw new Error(
            `Error al subir imagen a Cloudinary (${uploadRes.status}): ${errText}`
          );
        }

        const result = (await uploadRes.json()) as {
          secure_url: string;
          public_id: string;
          width?: number;
          height?: number;
          bytes?: number;
        };

        data.cloudinaryUrl = result.secure_url;
        data.cloudinaryPublicId = result.public_id;
        data.url = result.secure_url;
        data.thumbnailURL = result.secure_url;

        if (result.width) data.width = result.width;
        if (result.height) data.height = result.height;
        if (result.bytes) data.filesize = result.bytes;

        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc?.cloudinaryUrl && typeof doc.cloudinaryUrl === "string") {
          doc.url = doc.cloudinaryUrl;
          doc.thumbnailURL = doc.cloudinaryUrl;
        }
        return doc;
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (!doc?.cloudinaryPublicId) return;
        try {
          const { cloudName, apiKey, apiSecret } = getCloudinaryCredentials();
          const timestamp = Math.floor(Date.now() / 1000);
          const paramsToSign = {
            public_id: String(doc.cloudinaryPublicId),
            timestamp,
          };
          const signature = signCloudinaryParams(paramsToSign, apiSecret);

          const formData = new FormData();
          formData.append("public_id", String(doc.cloudinaryPublicId));
          formData.append("api_key", apiKey);
          formData.append("timestamp", String(timestamp));
          formData.append("signature", signature);

          await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
            {
              method: "POST",
              body: formData,
            }
          );
        } catch {
          // Ignore cleanup errors on delete
        }
      },
    ],
  },
  upload: {
    disableLocalStorage: true,
    mimeTypes: ["image/*"],
    handlers: [
      async (req, { doc, params }) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let mediaDoc: any =
            doc && typeof doc === "object" && "cloudinaryUrl" in doc
              ? doc
              : null;

          if (!mediaDoc && params?.filename) {
            const found = await req.payload.find({
              collection: "media",
              where: {
                filename: {
                  equals: decodeURIComponent(params.filename),
                },
              },
              limit: 1,
            });
            mediaDoc = found.docs?.[0] ?? null;
          }

          if (
            mediaDoc?.cloudinaryUrl &&
            typeof mediaDoc.cloudinaryUrl === "string"
          ) {
            const upstream = await fetch(mediaDoc.cloudinaryUrl);
            if (upstream.ok && upstream.body) {
              return new Response(upstream.body, {
                status: 200,
                headers: {
                  "Content-Type":
                    upstream.headers.get("content-type") || "image/webp",
                  "Cache-Control": "public, max-age=31536000, immutable",
                },
              });
            }
          }
        } catch {
          // Fall through if lookup fails
        }
        return new Response("Not Found", { status: 404 });
      },
    ],
  },
};
