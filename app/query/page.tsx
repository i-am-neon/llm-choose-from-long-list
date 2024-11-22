"use client";

import { useCallback, useState } from "react";
import { queryPinecone } from "./actions";

export default function Home() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const onClickQuery = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, queryButton: true }));
    const query = "consumable healing items";
    await queryPinecone(query);
    setLoadingStates((prev) => ({ ...prev, queryButton: false }));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>
          Do these one after the other and check the logs on the server (they
          will show up in your terminal, not in the browser)
        </p>
        <button
          className="mt-2 flex items-center px-2 py-1 font-semibold rounded-lg shadow-lg bg-black dark:bg-white text-white dark:text-black"
          onClick={onClickQuery}
        >
          {loadingStates["queryButton"] ? "Loading..." : "Query Pinecone"}
        </button>
      </main>
    </div>
  );
}

