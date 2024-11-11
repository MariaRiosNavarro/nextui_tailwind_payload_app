import { useEffect, useState } from "react";

import { CardProps } from "../types/index";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch("/api/getAllCards");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: CardProps[] = await response.json();

        setCards(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h2>Python Cards</h2>

        <div className="container mx-auto p-4">
          {cards.map((card) => (
            <div key={card.id} className="card mb-4 p-4 border rounded-lg">
              <h2 className="text-xl font-bold">{card.title}</h2>
              {/* Serialization  */}
              <div>
                {card.description.map((line, index) => (
                  <p key={index}>
                    {line.children.map((child, childIndex) => (
                      <span key={childIndex}>
                        {child.bold ? (
                          <strong>{child.text}</strong>
                        ) : (
                          child.text
                        )}
                        {child.code && <code>{child.text}</code>}
                        {child.italic && <em>{child.text}</em>}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
              <p className="italic">{card.category}</p>
              <pre className="bg-gray-200 text-secondary p-2 rounded">
                {card.codeExample}
              </pre>
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
