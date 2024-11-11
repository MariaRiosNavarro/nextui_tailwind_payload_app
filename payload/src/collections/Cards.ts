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
      editor: slateEditor({}),
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
