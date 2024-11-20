import * as React from "react";

import { DescriptionLine, CardProps } from "../types/index";

const serializeDescription = (description: DescriptionLine[]) => {
  return description.map((line, index) => {
    let content: React.ReactNode = null;

    switch (line.type) {
      case "h3":
        content = (
          <h3 key={index} className="text-[#3771A3] text-center text-lg py-3">
            {line.children.map((child) => child.text)}
          </h3>
        );
        break;
      case "h4":
        content = (
          <h4 key={index} className="text-[#3771A3] text-center text-md py-3">
            {line.children.map((child) => child.text)}
          </h4>
        );
        break;
      case "h5":
        content = (
          <h5 key={index} className="text-[#3771A3] text-center text-sm py-3">
            {line.children.map((child) => child.text)}
          </h5>
        );
        break;
      case "h6":
        content = (
          <h6 key={index} className="text-[#3771A3] text-center text-xs py-3">
            {line.children.map((child) => child.text)}
          </h6>
        );
        break;
      case "code":
        content = (
          <pre className="bg-default-100 my-2 p-4 rounded-md font-serif text-[#3771A3]">
            <code>{line.children[0].text}</code>
          </pre>
        );
        break;
      case "ul":
        content = (
          <ul key={index} className="list-disc pl-5">
            {line.children.map((child, childIndex) => (
              <li key={childIndex}>
                {child.children &&
                  child.children.map(
                    (subChild: { text: any }) => subChild.text
                  )}
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
                {child.children &&
                  child.children.map(
                    (subChild: { text: any }) => subChild.text
                  )}
              </li>
            ))}
          </ol>
        );
        break;
      default:
        content = (
          <p key={index}>
            {line.children.map((child, childIndex) => {
              let childContent: React.ReactNode = child.text;

              if (child.bold) childContent = <strong>{childContent}</strong>;
              if (child.italic) childContent = <em>{childContent}</em>;
              if (child.underline) childContent = <u>{childContent}</u>;

              return (
                <React.Fragment key={childIndex}>{childContent}</React.Fragment>
              );
            })}
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
  return (
    <div key={id} className="card pb-8 flex flex-col gap-6">
      <h2 className="text-lg text-[#FFD445] bold text-center bg-[#3771A3] py-4 rounded-md">
        {title}
      </h2>
      <div className="description">{serializeDescription(description)}</div>
      <p className="border border-secondary p-4 rounded text-center">
        <strong>Category:</strong> {category}
      </p>
      <pre className="bg-default-100 my-2 p-4 rounded-md font-serif text-[#3771A3]">
        <code>{codeExample}</code>
      </pre>
    </div>
  );
};

export default Card;
