"use client";

import { useState, useCallback } from "react";
import { generateItemQuery, generateSituation, chooseItem } from "./actions";
import { queryPinecone, QueryResult } from "../query/actions";

export default function Example() {
  const [situation, setSituation] = useState<string>();
  const [query, setQuery] = useState<string>();
  const [queryResults, setQueryResults] = useState<QueryResult[]>();
  const [chosenItem, setChosenItem] = useState<QueryResult>();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const getSituation = useCallback(async () => {
    setLoadingStates((prev) => ({ ...prev, createSituationButton: true }));
    const _situation = await generateSituation();
    setSituation(_situation);
    setLoadingStates((prev) => ({ ...prev, createSituationButton: false }));
  }, []);

  const getQuery = useCallback(async () => {
    if (!situation) {
      throw new Error("Situation is not defined");
    }
    setLoadingStates((prev) => ({ ...prev, createQueryButton: true }));
    const _query = await generateItemQuery(situation);
    setQuery(_query);
    setLoadingStates((prev) => ({ ...prev, createQueryButton: false }));
  }, [situation]);

  const queryDb = useCallback(async () => {
    if (!query) {
      throw new Error("Query is not defined");
    }
    setLoadingStates((prev) => ({ ...prev, queryDbButton: true }));
    const _queryResults = await queryPinecone(query);
    setQueryResults(_queryResults);
    setLoadingStates((prev) => ({ ...prev, queryDbButton: false }));
  }, [query]);

  const getItem = useCallback(async () => {
    if (!queryResults || !situation) {
      throw new Error("Query results or situation is not defined");
    }
    setLoadingStates((prev) => ({ ...prev, getItemButton: true }));
    const _chosenItem = await chooseItem({
      itemOptions: queryResults,
      situation,
    });
    setChosenItem(_chosenItem);
    setLoadingStates((prev) => ({ ...prev, getItemButton: false }));
  }, [queryResults, situation]);

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
        <section className="mt-20 flex flex-col gap-8">
          <div>
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
          {situation && (
            <div>
              <h2 className="text-pretty text-2xl font-semibold tracking-tight">
                Create a query to search for the item
              </h2>
              <p className="mt-2 text-base/7">description</p>
              <button
                id="createQueryButton"
                onClick={getQuery}
                className="mt-4 flex items-center px-2 py-1 font-semibold rounded-lg shadow-lg bg-black dark:bg-white text-white dark:text-black"
              >
                {loadingStates["createQueryButton"]
                  ? "Loading..."
                  : "Create Query"}
              </button>
              {query && (
                <div>
                  <h3 className="mt-4 text-pretty text-xl tracking-tight">
                    Generated Query
                  </h3>
                  <p className="mt-6 text-base/7">{query}</p>
                </div>
              )}
            </div>
          )}
          {query && (
            <div>
              <h2 className="text-pretty text-2xl font-semibold tracking-tight">
                Query the database
              </h2>
              <p className="mt-2 text-base/7">description</p>
              <button
                id="queryDbButton"
                onClick={queryDb}
                className="mt-4 flex items-center px-2 py-1 font-semibold rounded-lg shadow-lg bg-black dark:bg-white text-white dark:text-black"
              >
                {loadingStates["queryDbButton"] ? "Loading..." : "Query DB"}
              </button>
              {queryResults && (
                <div>
                  <h3 className="mt-4 text-pretty text-xl tracking-tight">
                    Query Result
                  </h3>
                  <ul className="mt-6 text-base/7">
                    {queryResults.map((result, index) => (
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
                  </ul>
                </div>
              )}
            </div>
          )}
          {queryResults && (
            <div>
              <h2 className="text-pretty text-2xl font-semibold tracking-tight">
                Choose the best item
              </h2>
              <p className="mt-2 text-base/7">description</p>
              <button
                id="getItemButton"
                onClick={getItem}
                className="mt-4 flex items-center px-2 py-1 font-semibold rounded-lg shadow-lg bg-black dark:bg-white text-white dark:text-black"
              >
                {loadingStates["getItemButton"] ? "Loading..." : "Get Item"}
              </button>
              {chosenItem && (
                <div>
                  <h3 className="mt-4 text-pretty text-xl tracking-tight">
                    Chosen Item
                  </h3>
                  <p className="mt-6 text-base/7">
                    {chosenItem.itemId} - {chosenItem.text}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

