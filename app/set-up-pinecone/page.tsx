"use client";

import { useCallback, useState } from "react";
import { upsertDataToPinecone, queryPinecone, initPinecone } from "./actions";

export default function Home() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const onClickInit = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, initButton: true }));
    await initPinecone();
    setLoadingStates((prev) => ({ ...prev, initButton: false }));
  }, []);

  const onClickUpsert = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, upsertButton: true }));
    await upsertDataToPinecone();
    setLoadingStates((prev) => ({ ...prev, upsertButton: false }));
  }, []);

  const onClickQuery = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, queryButton: true }));
    const query = "Tell me about the tech company known as Apple.";
    await queryPinecone(query);
    setLoadingStates((prev) => ({ ...prev, queryButton: false }));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-xl">Hi.</h1>
        <button
          className="bg-black text-white py-2 px-4 rounded"
          onClick={onClickInit}
        >
          {loadingStates["initButton"] ? "Loading..." : "Initialize Pinecone"}
        </button>
        <button
          className="bg-black text-white py-2 px-4 rounded"
          onClick={onClickUpsert}
        >
          {loadingStates["upsertButton"] ? "Loading..." : "Upsert Data"}
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={onClickQuery}
        >
          {loadingStates["queryButton"] ? "Loading..." : "Query Pinecone"}
        </button>
      </main>
    </div>
  );
}

