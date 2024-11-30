"use server";
import { z } from "zod";
import generateStructuredData from "./generate-structured-data";

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

