import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen max-w-4xl mx-auto p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
          How to make an LLM choose from a list using RAG
        </h1>
        <p className="mt-4">
          For very longs lists, LLMs have a hard time choosing the right item
          given criteria on how to choose. With very long lists, the LLM does
          not weigh each option equally and occaisionally it will hallucinate
          options that are not in the list. This tutorial will show you how to
          make an LLM choose from a list using RAG (Retrieval-Augmented
          Generation).
        </p>
        <div className="mt-2">
          <ul className="list-disc list-inside">
            <li>
              Watch the{" "}
              <a
                href="https://www.youtube.com/..."
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube video
              </a>
            </li>
            <li>
              Read the{" "}
              <a
                href="https://medium.com/..."
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Medium article
              </a>
            </li>
          </ul>
        </div>
        <h2 className="mt-4 text-2xl font-medium">Topics Covered</h2>
        <ul className="mt-2 space-y-4">
          <li>
            <strong>Setting up the vector database:</strong> In this example we
            use Pinecone as the vector database and a list of fake video game
            items as the data.
          </li>
          <li>
            <strong>Querying the vector database:</strong> Using similarity
            search to find the most similar items to a query.
          </li>
          <li>
            <strong>Creating a RAG agent:</strong> Given a video game situation,
            the agent will create a query and use the vector database to find
            the most similar items. It then chooses from the query results to
            find the best item for that situation.
          </li>
        </ul>
        <br />
        <Separator />
        <br />
        <p>
          First:
          <Link
            href="/set-up-pinecone"
            className="mt-2 flex items-center px-2 py-1 font-semibold rounded-lg shadow-lg bg-black dark:bg-white text-white dark:text-black"
          >
            Set Up Pinecone
          </Link>
        </p>
        <p>
          Then:
          <Link
            href="/query"
            className="mt-2 flex items-center px-2 py-1 font-semibold rounded-lg shadow-lg bg-black dark:bg-white text-white dark:text-black"
          >
            Try Out Querying Pinecone
          </Link>
        </p>
        <p>
          Finally:
          <Link
            href="/flow"
            className="mt-2 flex items-center px-2 py-1 font-semibold rounded-lg shadow-lg bg-black dark:bg-white text-white dark:text-black"
          >
            RAG Agent Flow
          </Link>
        </p>
      </main>
    </div>
  );
}

