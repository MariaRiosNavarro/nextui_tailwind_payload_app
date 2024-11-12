import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, ApiCard } from "../../types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiCard[] | { message: string }>
) {
  try {
    const response = await fetch("http://localhost:3000/api/cards");

    if (!response.ok) {
      return res.status(response.status).json({ message: response.statusText });
    }

    const apiResponse: ApiResponse = await response.json();

    return res.status(200).json(apiResponse.docs);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error :", error);

    return res.status(500).json({ message: "Error fetching data" });
  }
}
