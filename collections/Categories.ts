import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "name_en", "slug"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Nombre en Español (ES) — ej: Editorial, Proyectos...",
        },
        {
          name: "name_en",
          type: "text",
          label: "Nombre en Inglés (EN) — ej: Editorial, Projects...",
        },
      ],
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Identificador / Slug (ej: editorial, proyectos)",
    },
  ],
};
