import type { CollectionConfig } from "payload";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "createdAt"],
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      label: "Correo electrónico (Newsletter)",
    },
  ],
};

