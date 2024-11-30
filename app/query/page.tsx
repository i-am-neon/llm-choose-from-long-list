"use client";

import { useCallback, useState, FormEvent } from "react";
import { queryPinecone, QueryResult } from "./actions";

export default function Home() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<QueryResult[]>([]);

  const onClickQuery = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      setLoadingStates((prev) => ({ ...prev, queryButton: true }));
      const response = await queryPinecone(query);
      setResults(response);
      setLoadingStates((prev) => ({ ...prev, queryButton: false }));
    },
    [query]
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form onSubmit={onClickQuery} className="flex flex-col gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-2 py-1 border rounded-lg text-black"
            placeholder="Search items"
          />
          <button
            type="submit"
            className="mt-2 flex items-center px-2 py-1 font-semibold rounded-lg shadow-lg bg-black dark:bg-white text-white dark:text-black"
          >
            {loadingStates["queryButton"] ? "Loading..." : "Query Pinecone"}
          </button>
        </form>
        {results.length > 0 && (
          <div className="mt-4 p-4 border rounded-lg">
            {results.map((result, index) => (
              <div key={index} className="mb-4">
                <p>
                  <strong>Score:</strong> {result.score}
                </p>
                <p>
                  <strong>ID:</strong> {result.itemId}
                </p>
                <p>
                  <strong>Metadata:</strong> {result.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

