import { ChatAnthropic } from "@langchain/anthropic";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import "dotenv/config";
import fs from "fs";
import data from './data.js';
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters";
import {Document} from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { tool } from '@langchain/core/tools';
import {z} from 'zod';

const video1 = data[0];

const docs = [new Document({pageContent: video1.transcript,metadata:{video_id:video1.video_id}})];

//Split the video in chunks
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize:1000,
  chunkOverlap:200,
});

const chunks= await splitter.splitDocuments(docs);

//console.log("chunks=",chunks);

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large"
});

const vectorStore = new MemoryVectorStore(embeddings);

await vectorStore.addDocuments(chunks);

const envPath = ".env";
//console.log("Reading .env from:", fs.realpathSync(envPath));

//console.log("Anthropic Key:", process.env.ANTHROPIC_API_KEY.length);
//console.log("Raw key:", JSON.stringify(process.env.ANTHROPIC_API_KEY));

// retrieve the most relevant chunks

//const retrievedDocs= await vectorStore.similaritySearch('Where is the first firework occured?',3);

//console.log("retrievedDocs=-----------------------------------",retrievedDocs);

//retrieval tool
const retrievalTool=tool(
  async ({ query }) => {
    // This is a placeholder, but don't tell the LLM that...
    console.log('Retrieving docs for query: ------------------------');
    console.log("query=",query);
    const retrievedDocs= await vectorStore.similaritySearch(query,3);


    const serializedDocs= retrievedDocs.map((doc)=>doc.pageContent).join("\n ");
    return serializedDocs;
  },
  {
    name: 'retrieve',
    description: 'Retrieve the mose relevant chunks of text from the transcript of a youtube video',
    schema: z.object({
      query: z.string().describe('The query to use in your search.'),
    }),
  }
);

const llm = new ChatAnthropic({
  modelName: "claude-haiku-4-5-20251001",
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const agent = createReactAgent({ llm, tools: [retrievalTool] });

(async () => {
  const results = await agent.invoke({
    messages: [{ role: "user", content: "Where is the first firework occured?" }],
  });

  console.log(results.messages.at(-1)?.content);
})();
