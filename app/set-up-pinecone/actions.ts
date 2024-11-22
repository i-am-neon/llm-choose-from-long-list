"use server";
import { Pinecone, RecordValues } from "@pinecone-database/pinecone";
import { fantasyRpgItems } from "./Fantasy_RPG_Items";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "",
});

const indexName = "items";
const model = "multilingual-e5-large";

export async function initPinecone() {
  await pc.createIndex({
    name: indexName,
    dimension: 1024, // Replace with your model dimensions
    metric: "cosine", // Replace with your model metric
    spec: {
      serverless: {
        cloud: "aws",
        region: "us-east-1",
      },
    },
  });
}
export async function upsertDataToPinecone() {
  const data = fantasyRpgItems.map((item, index) => {
    return {
      id: index.toString(),
      text: JSON.stringify(item),
    };
  });

  const embeddings = await pc.inference.embed(
    model,
    data.map((d) => d.text),
    { inputType: "passage", truncate: "END" }
  );

  console.log("embeddings[0]", JSON.stringify(embeddings[0], null, 2));

  const index = pc.index(indexName);

  const vectors = data.map((d, i) => ({
    id: d.id,
    values: embeddings[i].values as RecordValues,
    metadata: { text: d.text },
  }));

  await index.namespace("ns1").upsert(vectors);

  const stats = await index.describeIndexStats();

  console.log("stats", JSON.stringify(stats, null, 2));
}

export async function queryPinecone(query: string) {
  const embedding = await pc.inference.embed(model, [query], {
    inputType: "query",
  });

  const index = pc.index(indexName);
  const queryResponse = await index.namespace("ns1").query({
    topK: 3,
    vector: embedding[0].values as RecordValues,
    includeValues: false,
    includeMetadata: true,
  });

  console.log("queryResponse", JSON.stringify(queryResponse, null, 2));
}

