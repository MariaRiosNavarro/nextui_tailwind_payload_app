// import { Link } from "@nextui-org/link";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
  cardItems,
}: {
  children: React.ReactNode;
  cardItems: { id: string; title: string }[];
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar cardItems={cardItems} />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        {/* <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link> */}
      </footer>
    </div>
  );
}
