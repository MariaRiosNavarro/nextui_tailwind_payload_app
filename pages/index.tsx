import { useEffect, useState } from "react";

import { CardProps } from "../types/index";

import Card from "./../components/Card";

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
            <Card
              key={card.id}
              category={card.category}
              codeExample={card.codeExample}
              description={card.description}
              id={card.id}
              title={card.title}
            />
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
