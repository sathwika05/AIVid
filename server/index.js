import express from 'express';
import cors from 'cors';
import {agent} from './agent.js'

const port = process.env.PORT || 3000;

const app=express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const openaiKey = process.env.OPENAI_API_KEY;
const anthropicKey = process.env.ANTHROPIC_API_KEY;
const dbUrl = process.env.DB_URL;

console.log("OpenAI:", !!openaiKey);
console.log("Anthropic:", !!anthropicKey);
console.log("DB:", !!dbUrl);


app.use(cors({origin: "*"}));

app.use(express.json({ limit: "10mb" })); // Adjust if your payloads are bigger
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get('/health',(req,res)=>{
  res.send("OK");
});

app.get('/',(req,res)=>{
  res.send('Hello World');
});

app.post('/generate',async (req,res)=>{
    console.log("query=",req.body);
    
    const {query,video_id,thread_id}=req.body;
    console.log(query,video_id);

    const results = await agent.invoke({
    messages: [{ role: "user", content: query,}],
  },{configurable:{thread_id,video_id}});
 
  console.log(results.messages.at(-1)?.content);
  
  
    res.send(results.messages.at(-1).content);
})

app.post('/webhook',(req,res)=>{
  console.log(req.body);

  res.send('OK'); 
});

app.listen(port,()=>{console.log(`Server is running on port ${port}`);
});

