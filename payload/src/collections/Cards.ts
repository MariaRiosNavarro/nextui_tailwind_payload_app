import { CollectionConfig } from "payload/types";
import { slateEditor } from "@payloadcms/richtext-slate";

// // Custom hook type definition
// type OrderReorderHook = (args: {
//   req: any;
//   operation: "create" | "update" | "delete";
//   originalDoc?: Record<string, any>;
//   data: Record<string, any>;
// }) => Promise<Record<string, any>>;

// Custom hook to handle order rearrangement
// const reorderCardsBeforeChange: OrderReorderHook = async (args) => {
//   const { req, operation, originalDoc, data } = args;

//   // Only run for update operations where order is being changed
//   if (operation === "update" && data.order !== undefined) {
//     const { payload } = req;

//     // Fetch all cards, sorted by current order
//     const existingCards = await payload.find({
//       collection: "cards",
//       limit: 0,
//       sort: "order", // Ensure cards are sorted by order
//     });

//     // Sort existing cards by current order
//     const sortedCards = existingCards.docs;

//     // Find the card being updated
//     const updatingCard = sortedCards.find(
//       (card) => card.id === originalDoc?.id
//     );
//     if (!updatingCard) return data;

//     const newOrder = data.order;
//     const oldOrder = updatingCard.order;

//     // Determine if we're moving the card up or down
//     const isMovingUp = newOrder < oldOrder; // From higher to lower number

//     // Create a copy of cards to manipulate
//     const updatedCards = [...sortedCards];

//     if (isMovingUp) {
//       // Moving from a higher number to a lower number (9 → 2)
//       // Example: Move card from 9 to 2
//       updatedCards.forEach((card) => {
//         // Cards between new and old position get incremented
//         if (
//           card.id !== originalDoc?.id &&
//           card.order >= newOrder &&
//           card.order < oldOrder
//         ) {
//           card.order += 1;
//         }
//       });
//     } else {
//       // Moving from a lower number to a higher number (2 → 9)
//       // Example: Move card from 2 to 9
//       updatedCards.forEach((card) => {
//         // Cards between old and new position get decremented
//         if (
//           card.id !== originalDoc?.id &&
//           card.order > oldOrder &&
//           card.order <= newOrder
//         ) {
//           card.order -= 1;
//         }
//       });
//     }

//     // Update all affected cards
//     for (const card of updatedCards) {
//       if (card.id !== originalDoc?.id) {
//         await payload.update({
//           collection: "cards",
//           id: card.id,
//           data: { order: card.order },
//         });
//       }
//     }
//   }

//   return data;
// };

const Cards: CollectionConfig = {
  slug: "cards",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  // hooks: {
  //   beforeChange: [reorderCardsBeforeChange],
  // },
  fields: [
    {
      name: "order",
      type: "number",
      required: true,
      // admin: {
      //   description:
      //     "Cambia este número para reordenar la tarjeta. Otras tarjetas se ajustarán automáticamente.",
      // },
    },
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
