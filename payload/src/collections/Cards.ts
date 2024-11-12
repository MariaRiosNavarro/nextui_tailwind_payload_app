import { CollectionConfig } from "payload/types";
import { slateEditor } from "@payloadcms/richtext-slate";

const Cards: CollectionConfig = {
  slug: "cards",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      editor: slateEditor({
        admin: {
          elements: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "blockquote",
            "link",
            "ol",
            "ul",
            "textAlign",
            "indent",
            "relationship",
          ],
          leaves: ["bold", "italic", "underline", "strikethrough", "code"],
          link: {
            // Inject your own fields into the Link element
            fields: [
              {
                name: "rel",
                label: "Rel Attribute",
                type: "select",
                hasMany: true,
                options: ["noopener", "noreferrer", "nofollow"],
              },
            ],
          },
        },
      }),
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Basic", value: "basic" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advanced", value: "advanced" },
      ],
    },
    {
      name: "codeExample",
      type: "code",
    },
  ],
};

export default Cards;
