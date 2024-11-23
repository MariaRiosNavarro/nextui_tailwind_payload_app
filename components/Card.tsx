import { useTheme } from "next-themes";
import Link from "next/link";
import * as React from "react";

import { DescriptionLine, DescriptionChild, CardProps } from "../types/index";

// const serializeDescription = (
//   description: DescriptionLine[],
//   theme: string
// ) => {
//   return description.map((line, index) => {
//     let content: React.ReactNode = null;

//     switch (line.type) {
//       case "h3":
//         content = (
//           <h3
//             key={index}
//             className="text-[#3771A3] text-center text-lg py-8 font-bold"
//           >
//             {line.children.map((child) => child.text)}
//           </h3>
//         );
//         break;
//       case "h4":
//         content = (
//           <h4
//             key={index}
//             className="text-[#3771A3] text-center text-md py-8 font-bold"
//           >
//             {line.children.map((child) => child.text)}
//           </h4>
//         );
//         break;
//       case "h5":
//         content = (
//           <h5
//             key={index}
//             className="text-[#3771A3] text-center text-sm py-8 font-bold"
//           >
//             {line.children.map((child) => child.text)}
//           </h5>
//         );
//         break;
//       case "h6":
//         content = (
//           <h6
//             key={index}
//             className="text-[#3771A3] text-center text-xs py-8 font-bold"
//           >
//             {line.children.map((child) => child.text)}
//           </h6>
//         );
//         break;
//       case "code":
//         content = (
//           <pre
//             className="bg-default-100 my-2 p-4 rounded-md font-serif"
//             style={{ color: theme === "dark" ? "#FFD445" : "#3771A3" }}
//           >
//             <code>{line.children[0].text}</code>
//           </pre>
//         );
//         break;
//       case "ul":
//         content = (
//           <ul key={index} className="list-disc pl-5">
//             {line.children.map((child, childIndex) => (
//               <li key={childIndex}>
//                 {child.children &&
//                   child.children.map(
//                     (subChild: { text: any }) => subChild.text
//                   )}
//               </li>
//             ))}
//           </ul>
//         );
//         break;
//       case "ol":
//         content = (
//           <ol key={index} className="list-decimal pl-6">
//             {line.children.map((child, childIndex) => (
//               <li key={childIndex}>
//                 {child.children &&
//                   child.children.map(
//                     (subChild: { text: any }) => subChild.text
//                   )}
//               </li>
//             ))}
//           </ol>
//         );
//         break;
//       case "link":
//         // NO SE
//         content = (
//           <Link href={line.url} className="text-primary-50" target="_blank">
//             {children[0]}
//           </Link>
//         );
//         break;

//       default:
//         content = (
//           <p key={index}>
//             {line.children.map((child, childIndex) => {
//               let childContent: React.ReactNode = child.text;

//               if (child.bold) childContent = <strong>{childContent}</strong>;
//               if (child.italic) childContent = <em>{childContent}</em>;
//               if (child.underline) childContent = <u>{childContent}</u>;

//               return (
//                 <React.Fragment key={childIndex}>{childContent}</React.Fragment>
//               );
//             })}
//           </p>
//         );
//     }

//     return <React.Fragment key={index}>{content}</React.Fragment>;
//   });
// };

const serializeDescription = (
  description: DescriptionLine[],
  theme: string
) => {
  const renderChild = (child: DescriptionChild): React.ReactNode => {
    if (child.type === "link") {
      return (
        <Link
          className="italic"
          href={child.url || ""}
          style={{ color: theme === "dark" ? "#FFD445" : "#3771A3" }}
          // target={child.newTab ? "_blank" : undefined}
          target="_blank"
        >
          {child.children?.[0].text}
        </Link>
      );
    }

    // Si es texto con formato
    let content: React.ReactNode = child.text || "";

    if (child.bold) content = <strong>{content}</strong>;
    if (child.italic) content = <em>{content}</em>;
    if (child.underline) content = <u>{content}</u>;
    if (child.code) content = <code>{content}</code>;

    return content;
  };

  return description.map((line, index) => {
    let content: React.ReactNode = null;

    switch (line.type) {
      case "h3":
        content = (
          <h3
            key={index}
            className="text-[#3771A3] text-center text-lg py-8 font-bold"
          >
            {line.children.map((child, idx) => (
              <React.Fragment key={idx}>{renderChild(child)}</React.Fragment>
            ))}
          </h3>
        );
        break;
      case "h4":
        content = (
          <h4
            key={index}
            className="text-[#3771A3] text-center text-md py-8 font-bold"
          >
            {line.children.map((child, idx) => (
              <React.Fragment key={idx}>{renderChild(child)}</React.Fragment>
            ))}
          </h4>
        );
        break;
      case "h5":
        content = (
          <h5
            key={index}
            className="text-[#3771A3] text-center text-sm py-8 font-bold"
          >
            {line.children.map((child, idx) => (
              <React.Fragment key={idx}>{renderChild(child)}</React.Fragment>
            ))}
          </h5>
        );
        break;
      case "h6":
        content = (
          <h6
            key={index}
            className="text-[#3771A3] text-center text-xs py-8 font-bold"
          >
            {line.children.map((child, idx) => (
              <React.Fragment key={idx}>{renderChild(child)}</React.Fragment>
            ))}
          </h6>
        );
        break;
      case "code":
        content = (
          <pre
            className="bg-default-100 my-2 p-4 rounded-md font-serif"
            style={{ color: theme === "dark" ? "#FFD445" : "#3771A3" }}
          >
            <code>{line.children[0].text}</code>
          </pre>
        );
        break;
      case "ul":
        content = (
          <ul key={index} className="list-disc pl-5">
            {line.children.map((child, childIndex) => (
              <li key={childIndex}>
                {child.children?.map((subChild, idx) => (
                  <React.Fragment key={idx}>
                    {renderChild(subChild)}
                  </React.Fragment>
                ))}
              </li>
            ))}
          </ul>
        );
        break;
      case "ol":
        content = (
          <ol key={index} className="list-decimal pl-6">
            {line.children.map((child, childIndex) => (
              <li key={childIndex}>
                {child.children?.map((subChild, idx) => (
                  <React.Fragment key={idx}>
                    {renderChild(subChild)}
                  </React.Fragment>
                ))}
              </li>
            ))}
          </ol>
        );
        break;
      default:
        content = (
          <p key={index}>
            {line.children.map((child, childIndex) => (
              <React.Fragment key={childIndex}>
                {renderChild(child)}
              </React.Fragment>
            ))}
          </p>
        );
    }

    return <React.Fragment key={index}>{content}</React.Fragment>;
  });
};

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  category,
  codeExample,
}) => {
  const theme = useTheme().theme || "light";

  return (
    <div
      key={id}
      className="card pb-8 flex flex-col pt-20  md:pt-10 lg:pt-48 "
      id={id}
    >
      <h2 className="text-lg text-[#FFD445] bold text-center bg-[#3771A3] py-4 rounded-md">
        {title}
      </h2>
      <div className="description py-6">
        {serializeDescription(description, theme)}
      </div>
      <p className="border border-primary p-4 rounded text-center">
        <strong>Category:</strong> {category}
      </p>
      <pre
        className="bg-default-100 my-2 p-4 rounded-md font-serif"
        style={{ color: theme === "dark" ? "#FFD445" : "#3771A3" }}
      >
        <code>{codeExample}</code>
      </pre>
    </div>
  );
};

export default Card;
