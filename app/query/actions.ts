"use server";
import { Pinecone, RecordValues } from "@pinecone-database/pinecone";
import { indexName, model } from "../set-up-pinecone/pinecone-constants";

const pineconeClient = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "",
});

export interface QueryResult {
  score: number;
  text: string;
}

export async function queryPinecone(query: string): Promise<QueryResult[]> {
  const embedding = await pineconeClient.inference.embed(model, [query], {
    inputType: "query",
  });

  const index = pineconeClient.index(indexName);
  const queryResponse = await index.namespace("ns1").query({
    topK: 5,
    vector: embedding[0].values as RecordValues,
    includeValues: false,
    includeMetadata: true,
  });

  console.log("queryResponse", JSON.stringify(queryResponse, null, 2));
  return queryResponse.matches.map((match) => ({
    score: match.score || 0,
    text: match?.metadata?.text.toString() || "",
  }));
}

