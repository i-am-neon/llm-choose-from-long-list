"use client";

import { useState, useCallback } from "react";
import { generateSituation } from "./actions";

export default function Example() {
  const [situation, setSituation] = useState<string>();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const getSituation = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, createSituationButton: true }));
    const _situation = await generateSituation();
    setSituation(_situation);
    setLoadingStates((prev) => ({ ...prev, createSituationButton: false }));
  }, []);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="max-w-4xl">
          <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
            The Whole Flow
          </h1>
          <p className="mt-6 text-balance text-xl/8">
            This is a step by step representation of the flow of the AI using
            the vector database to choose which item best suits the situation.
          </p>
        </div>
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="">
            <h2 className="text-pretty text-2xl font-semibold tracking-tight">
              Create a situation for an item to be chosen
            </h2>
            <p className="mt-2 text-base/7">description</p>
            <button
              id="createSituationButton"
              onClick={getSituation}
              className="mt-4 flex items-center px-2 py-1 font-semibold rounded-lg shadow-lg bg-black dark:bg-white text-white dark:text-black"
            >
              {loadingStates["createSituationButton"]
                ? "Loading..."
                : "Create Situation"}
            </button>
            {situation && (
              <div>
                <h3 className="mt-4 text-pretty text-xl tracking-tight">
                  Generated Situation
                </h3>
                <p className="mt-6 text-base/7">{situation}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

