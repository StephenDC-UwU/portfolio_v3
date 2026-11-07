import type { CollectionConfig } from "payload";

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
  ],
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
  },
};

