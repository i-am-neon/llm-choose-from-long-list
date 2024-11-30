"use server";
import { z } from "zod";
import generateStructuredData from "./generate-structured-data";
import { QueryResult } from "../query/actions";

export async function generateSituation(): Promise<string> {
  const systemMessage =
    "Create a situation for an item to be chosen within an RPG fantasy world. Mention the setting and container. Output should be one sentence.";
  const { situation } = await generateStructuredData({
    systemMessage,
    schema: z.object({
      situation: z.string(),
    }),
  });

  return situation;
}

export async function generateItemQuery(situation: string): Promise<string> {
  const systemMessage =
    "You will be given a situation for an item to be chosen within an RPG fantasy world. You must come up with a short query for a vector database of game items to find the best item for the situation.";
  const { query } = await generateStructuredData({
    systemMessage,
    prompt: situation,
    schema: z.object({
      query: z.string(),
    }),
  });

  return query;
}

export async function chooseItem({
  itemOptions,
  situation,
}: {
  itemOptions: QueryResult[];
  situation: string;
}): Promise<QueryResult> {
  const systemMessage =
    "You will be given a situation for an item to be chosen within an RPG fantasy world along with a list of items to choose from. Choose the best item for the situation, returning its ID.";
  const { itemID } = await generateStructuredData({
    systemMessage,
    prompt: `Situation: ${situation}\n\nItem Options: ${JSON.stringify(
      itemOptions
    )}`,
    schema: z.object({
      itemID: z.string(),
    }),
  });

  const result = itemOptions.find((item) => item.itemId === Number(itemID));
  if (!result) {
    throw new Error("Invalid item ID");
  }
  return result;
}

