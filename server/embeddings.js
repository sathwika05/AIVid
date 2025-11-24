import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import {Document} from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";


const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large"
});

//export const vectorStore = new MemoryVectorStore(embeddings);
export const vectorStore = await PGVectorStore.initialize(embeddings, {
    postgresConnectionOptions:{
        connectionString: process.env.DB_URL,
    },
    tableName: 'video_transcripts',
    columns:{idColumnName:'id',
        vectorColumnnName:'vector',
        contentColumnName: 'content',
        metadataColumnName: 'metadata',
    },
    distanceStrategy: 'cosine'
});

export const addYTVideoToVectorStore = async (videoData)=>{
    const {transcript,video_id}=videoData;

    const docs = [
        new Document({
            pageContent: transcript,
            metadata:{video_id}})];
//console.log("docs=",docs);

//Split the video in chunks
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize:1000,
  chunkOverlap:200,
});

const chunks= await splitter.splitDocuments(docs);

//console.log("chunks=",chunks);


await vectorStore.addDocuments(chunks);

}