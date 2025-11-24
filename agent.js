import { ChatAnthropic } from "@langchain/anthropic";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import "dotenv/config";
import fs from "fs";
import data from './data.js';
import { tool } from '@langchain/core/tools';
import { MemorySaver } from '@langchain/langgraph';
import {z} from 'zod';
import {vectorStore,addYTVideoToVectorStore} from "./embeddings.js";



//await addYTVideoToVectorStore(data[0]);
//await addYTVideoToVectorStore(data[1]);

//retrieval tool
const retrievalTool=tool(
  async ({ query},{configurable: {video_id}}) => {

    //const video_id=options?.configurable?.video_id;
    // This is a placeholder, but don't tell the LLM that...
    console.log('Retrieving docs for query: ------------------------');
    console.log("query=",query);
    console.log("video_id=",video_id);
    
    const retrievedDocs = await vectorStore.similaritySearch(query, 3,{video_id});

    //console.log('Retrieved docs: -----------------');
    //console.log(retrievedDocs[0]);
    
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

const checkpointer = new MemorySaver();

export const agent = createReactAgent({ llm, tools: [retrievalTool],checkpointer, });
/*
//testing the agent
const video_id='fuhE6PYnRMc';
  console.log('------------Q1: What countless cars are used for?',video_id);
  
  const results = await agent.invoke({
    messages: [{ role: "user", content: "How many buses jet car cleared?" }],
  },{configurable:{thread_id:1,video_id}});

  console.log(results.messages.at(-1)?.content);

/*
console.log('----------Q2: What piece people used to throw in fire to create a loud bang at that time');
  
  const result2 = await agent.invoke({
    messages: [{ role: "user", content: "What piece people used to throw in fire to create a loud bang at that time?" }],},
    {configurable:{thread_id:1}});

  console.log(result2.messages.at(-1)?.content);
*/