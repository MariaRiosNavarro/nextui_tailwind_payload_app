# Next.js & NextUI & Tailwind & Payload

## A. Project Setup Next.js & NextUI

1. Install the NextUI CLI globally:

```bash

   npm install -g nextui-cli

```

2. Create your project:

```bash

   nextui init your-project-name

```

3. Navigate to your project directory:

```bash

cd your-project-name
npm install

```

4. Configuring Dependencies -> Update Framer Motion to the recommended version (I need it to uninstall the wrong version):

```bash
npm uninstall framer-motion
npm install framer-motion@10
npm install framer

```

5. Modify the tailwind.config.js file if you're not using ES modules (remove 'import {nextui}...' and use 'const { nextui } = require("@nextui-org/theme")' version):

```js
// tailwind.config.js
// import { nextui } from '@nextui-org/theme';
const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
```

6. Start the development server to check its works, wenn everything works, kann you close the terminal:

```
npm run dev

```

## B. Payload INTEGRATION:

1. Inside your Next App in the root, install Payload App

```sh
   npx create-payload-app@latest
```

![Bild2](/readmeAssets/bild2.png)

Follow the installation prompts. Name your Payload app (e.g., 'payload') and use in the installation the connection string to your Database, for example your MongoDB or MongoDB Atlas connection string.

![Bild1](/readmeAssets/bild1.png)

For example the Conexion String with MongoDB Atlas String is like this:

```
mongodb+srv://<user>:<password>@cluster0.hfwosz5.mongodb.net/<data_base_name>?retryWrites=true&w=majority&appName=Cluster0

```

2. Install additional packages (e.g., rich text editor):

```sh
npm install --save @payloadcms/richtext-slate

```

3. Create new Collections. User Collection is default in your 'Blank' template. I added my new Collection 'Cards'. Update your payload.config.ts file to include new collections and the rich text editor/extra dependencies:

```js
import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
// Import of the Editor
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
// Import of the  New Collection Cards
import Cards from "./collections/Cards";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  // I add it the Editor and the Editor Options
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
    },
  }),
  // I add it the New Collection Cards
  collections: [Users, Cards],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
```

4. Navigate to the Payload folder and run:

```
npm run dev
```

Access the Payload admin panel at http://localhost:3000/admin to set up your first admin user. (CHECK THAT http://localhost:3000 IST FREE)

## C. Conexion Next + Payload

1. Create a component (e.g., a Card component) to display information from the Cards database collection.

2. In the pages/api directory, create an API route to get all cards (e.g., getAllCards.ts):

```ts
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
    console.log("Error :", error);

    return res.status(500).json({ message: "Error fetching data" });
  }
}
```

3. In the component where you want to render the cards, fetch data from your handler:

```tsx
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
```

## D. Run the Project

1. Go to the /payload/ directory and run 'npm run dev' for PAYLOAD in a terminal. Then, open http://localhost:3000/admin in a browser and log in. Create some Cards Items in the Collection Cards.

2. In another terminal, remeins in the root directory and run 'npm run dev' for NEXTUI. Open in your browser, the recomended localhost port you see in terminal. Now you should see the Cards info in Browser.

## License

Licensed nextui under the [MIT license](https://github.com/nextui-org/next-pages-template/blob/main/LICENSE).

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI](https://nextui.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [payloadcms](https://payloadcms.com/)
