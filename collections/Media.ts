import type { CollectionConfig } from "payload";
import sharp from "sharp";

function parseDataUrl(dataUrl: string): { mimeType: string; buffer: Buffer } | null {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  return {
    mimeType: match[1],
    buffer: Buffer.from(match[2], "base64"),
  };
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
      name: "dataUrl",
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
        if (file?.data) {
          const mime = file.mimetype || "image/jpeg";
          let outputBuffer: Buffer = file.data;
          let outputMime = mime;

          // Optimize raster images with sharp so database storage stays fast and lightweight
          if (
            mime.startsWith("image/") &&
            !mime.includes("svg") &&
            !mime.includes("gif")
          ) {
            try {
              outputBuffer = await sharp(file.data)
                .rotate()
                .resize({ width: 1600, withoutEnlargement: true })
                .webp({ quality: 82 })
                .toBuffer();
              outputMime = "image/webp";
            } catch {
              outputBuffer = file.data;
              outputMime = mime;
            }
          }

          data.dataUrl = `data:${outputMime};base64,${outputBuffer.toString("base64")}`;
        }
        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc?.dataUrl && typeof doc.dataUrl === "string") {
          doc.thumbnailURL = doc.dataUrl;
          if (!doc.url) {
            doc.url = doc.dataUrl;
          }
        }
        return doc;
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
            doc && typeof doc === "object" && "dataUrl" in doc ? doc : null;

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

          if (mediaDoc?.dataUrl && typeof mediaDoc.dataUrl === "string") {
            const parsed = parseDataUrl(mediaDoc.dataUrl);
            if (parsed) {
              return new Response(new Uint8Array(parsed.buffer), {
                status: 200,
                headers: {
                  "Content-Type": parsed.mimeType,
                  "Content-Length": String(parsed.buffer.byteLength),
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
