import * as React from "react";

import { DescriptionLine, CardProps } from "../types/index";

// Función para serializar la descripción
const serializeDescription = (description: DescriptionLine[]) => {
  return description.map((line, index) => {
    return (
      <p key={index}>
        {line.children.map((child, childIndex) => {
          // Crear un array para almacenar los elementos JSX
          const elements: JSX.Element[] = [];

          // Agregar el texto normal
          elements.push(<span key={childIndex}>{child.text}</span>);

          // Aplicar estilos según las propiedades
          if (child.bold) {
            elements.push(
              <strong key={`bold-${childIndex}`}>{child.text}</strong>
            );
          }

          if (child.code) {
            elements.push(<code key={`code-${childIndex}`}>{child.text}</code>);
          }

          if (child.italic) {
            elements.push(<em key={`italic-${childIndex}`}>{child.text}</em>);
          }

          return <>{elements}</>;
        })}
      </p>
    );
  });
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  category,
  codeExample,
}) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="description">{serializeDescription(description)}</div>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <pre>
        <code>{codeExample}</code>
      </pre>
    </div>
  );
};

export default Card;
