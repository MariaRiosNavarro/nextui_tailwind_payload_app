import type { NextApiRequest, NextApiResponse } from "next";

type Card = {
  id: string;
  title: string;
  description: string;
  category: string;
  codeExample: string;
};

type ApiResponse = {
  docs: Card[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card[]>
) {
  const response = await fetch("http://localhost:3000/api/cards");
  const apiResponse: ApiResponse = await response.json();

  if (!response.ok) {
    return res.status(response.status).json(apiResponse.docs);
  }

  return res.status(200).json(apiResponse.docs);
}

// type Data = {
//   name: string;
// };

// export default function Handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>,
// ) {
//   res.status(200).json({ name: "John Doe" });
// }
