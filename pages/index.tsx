import type { NextApiRequest, NextApiResponse } from "next";

import { useEffect, useState } from "react";

import { ApiResponse, ApiCard } from "../types";

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
        const response = await fetch("http://localhost:3000/api/cards");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const apiResponse: ApiResponse = await response.json();

        let responseDocs = apiResponse.docs;

        const orderedData = responseDocs.sort((a, b) => a.order - b.order);

        console.log("card", orderedData[3]);

        setCards(orderedData);
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

  const cardItems = cards.map((card) => ({
    id: card.id,
    title: card.title,
  }));

  return (
    <DefaultLayout cardItems={cardItems}>
      <section className="flex flex-col items-center justify-center  md:py-10">
        {/* <h2 className="text-xl pt-12 pb-8">Python Cards</h2> */}

        <div className="container mx-auto">
          {cards.map((card) => (
            <Card
              key={card.id}
              category={card.category}
              codeExample={card.codeExample}
              description={card.description}
              id={card.id}
              order={card.order}
              title={card.title}
            />
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
