import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

function revalidateBlogRoutes(slug?: string) {
  try {
    revalidatePath("/es/blogs");
    revalidatePath("/en/blogs");
    revalidatePath("/sitemap.xml");
    if (slug) {
      revalidatePath(`/es/blogs/${slug}`);
      revalidatePath(`/en/blogs/${slug}`);
    }
  } catch {
    // Ignore when called outside Next.js request context
  }
}

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "categoryItem", "publishedAt", "featured", "status"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateBlogRoutes(doc?.slug);
        return doc;
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateBlogRoutes(doc?.slug);
        return doc;
      },
    ],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Slug (URL amigable, ej: encontrando-una-nueva-especie)",
    },
    {
      type: "row",
      fields: [
        {
          name: "publishedAt",
          type: "date",
          required: true,
          defaultValue: () => new Date().toISOString(),
          label: "Fecha de publicación",
          admin: {
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "dd/MM/yyyy",
            },
          },
        },
        {
          name: "categoryItem",
          type: "relationship",
          relationTo: "categories",
          required: true,
          label: "Categoría (puedes crear nuevas con el botón '+')",
        },
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "published",
          label: "Estado",
          options: [
            { label: "Borrador", value: "draft" },
            { label: "Publicado", value: "published" },
          ],
        },
      ],
    },
    // Tabs for Spanish (ES) and English (EN) main metadata
    {
      type: "tabs",
      tabs: [
        {
          label: "Español (ES)",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                  label: "Título del Artículo (ES)",
                },
                {
                  name: "readTime",
                  type: "text",
                  required: true,
                  defaultValue: "Lectura de 4 minutos",
                  label: "Tiempo de lectura (ES)",
                },
              ],
            },
            {
              name: "excerpt",
              type: "textarea",
              required: true,
              label: "Resumen / Entradilla (ES)",
            },
          ],
        },
        {
          label: "English (EN)",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "title_en",
                  type: "text",
                  label: "Article Title (EN - Opcional, usa ES si se deja vacío)",
                },
                {
                  name: "readTime_en",
                  type: "text",
                  defaultValue: "4 min read",
                  label: "Read Time (EN)",
                },
              ],
            },
            {
              name: "excerpt_en",
              type: "textarea",
              label: "Excerpt / Summary (EN - Opcional, usa ES si se deja vacío)",
            },
          ],
        },
      ],
    },
    // Legacy hidden columns to prevent Drizzle interactive drop/rename prompts in dev
    {
      name: "date",
      type: "text",
      defaultValue: "Sábado 14 Junio 2026",
      admin: {
        hidden: true,
      },
    },
    {
      name: "category",
      type: "select",
      defaultValue: "editorial",
      options: [
        { label: "Editorial", value: "editorial" },
        { label: "Proyectos", value: "proyectos" },
        { label: "Notas de campo", value: "notas-de-campo" },
        { label: "Especímenes", value: "especimenes" },
      ],
      admin: {
        hidden: true,
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Imagen de Portada Principal",
    },
    {
      type: "row",
      fields: [
        {
          name: "featured",
          type: "checkbox",
          defaultValue: false,
          label: "Nota destacada (Featured)",
        },
        {
          name: "popular",
          type: "checkbox",
          defaultValue: false,
          label: "Popular",
        },
        {
          name: "favorite",
          type: "checkbox",
          defaultValue: false,
          label: "Favorito",
        },
      ],
    },
    {
      name: "sections",
      type: "array",
      label: "Secciones del Artículo (ES / EN — Generan el índice 'En este artículo')",
      minRows: 1,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "number",
              type: "text",
              required: true,
              defaultValue: "01",
              label: "Número (ej: 01)",
            },
            {
              name: "heading",
              type: "text",
              required: true,
              label: "Subtítulo de la sección (ES)",
            },
            {
              name: "heading_en",
              type: "text",
              label: "Section Subheading (EN - Opcional)",
            },
          ],
        },
        {
          name: "content",
          type: "textarea",
          defaultValue: "",
          label:
            "Contenido / Texto de esta sección (ES) — Puedes escribir varios párrafos separados por Enter",
          admin: {
            rows: 6,
          },
        },
        {
          name: "content_en",
          type: "textarea",
          label:
            "Section Content / Text (EN - Opcional) — Separate paragraphs with Enter",
          admin: {
            rows: 6,
          },
        },
        {
          name: "paragraphs",
          type: "array",
          label: "Párrafos adicionales (Legacy)",
          admin: {
            hidden: true,
          },
          fields: [
            {
              name: "text",
              type: "textarea",
              label: "Párrafo (ES)",
            },
            {
              name: "text_en",
              type: "textarea",
              label: "Paragraph (EN - Opcional)",
            },
          ],
        },
        {
          name: "sectionImage",
          type: "upload",
          relationTo: "media",
          label: "Imagen opcional dentro de esta sección",
        },
        {
          type: "row",
          fields: [
            {
              name: "sectionImageCaption",
              type: "text",
              label: "Pie de foto (ES)",
            },
            {
              name: "sectionImageCaption_en",
              type: "text",
              label: "Image Caption (EN - Opcional)",
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "quoteText",
              type: "textarea",
              label: "Cita destacada opcional (ES)",
            },
            {
              name: "quoteText_en",
              type: "textarea",
              label: "Highlighted Quote (EN - Opcional)",
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "quoteAuthor",
              type: "text",
              defaultValue: "— Nota de campo",
              label: "Autor / Pie de la cita (ES)",
            },
            {
              name: "quoteAuthor_en",
              type: "text",
              defaultValue: "— Field note",
              label: "Quote Author (EN - Opcional)",
            },
          ],
        },
      ],
    },
    {
      name: "tags",
      type: "array",
      label: "Etiquetas (Tags)",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
