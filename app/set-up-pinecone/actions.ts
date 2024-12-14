"use server";
import { Pinecone, RecordValues } from "@pinecone-database/pinecone";
import { fantasyRpgItems } from "./Fantasy_RPG_Items";
import { indexName, model } from "./pinecone-constants";

const pineconeClient = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "",
});

export async function initPinecone() {
  await pineconeClient.createIndex({
    name: indexName,
    dimension: 1024,
    metric: "cosine",
    spec: {
      serverless: {
        cloud: "aws",
        region: "us-east-1",
      },
    },
  });
}
export async function upsertDataToPinecone(): Promise<void> {
  const data = fantasyRpgItems.map((item, index) => {
    return {
      id: index.toString(),
      text: JSON.stringify(item),
    };
  });

  const embeddings = await pineconeClient.inference.embed(
    model,
    data.map((d) => d.text),
    { inputType: "passage", truncate: "END" }
  );

  const index = pineconeClient.index(indexName);

  const vectors = data.map((d, i) => ({
    id: d.id,
    values: embeddings[i].values as RecordValues,
    metadata: { text: d.text },
  }));

  await index.namespace("ns1").upsert(vectors);
}

