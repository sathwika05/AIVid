🚀 AIVid — AI-Powered Video Transcript Intelligence

AIVid is an AI agent that converts video transcripts into instant insights.
It scrapes the video transcript using Bright Data, stores it in PgVector (Neon), and uses a RAG pipeline with tool-calling to answer user questions with high accuracy and context.

🔗 Live Frontend: https://aivid-frontend.onrender.com

🔗 Backend API: https://aivid.onrender.com

⭐ What AIVid Does
🎥 Turns video transcripts into searchable knowledge

Scrapes the transcript from any video using Bright Data

Splits, embeds, and stores transcript chunks

Enables efficient semantic search with PgVector

🔍 Retrieval-Augmented Generation (RAG)

Uses similarity search to fetch the most relevant transcript pieces

Grounded answers — no hallucinations

Filters chunks by video_id, enabling multi-video support

🤖 AI Agent with LangChain Tool Calling

Custom retrieve tool retrieves transcript chunks

LLM decides when to call the tool

Produces real-time, context-aware answers

💬 Clean Chat UI

Minimal, modern React interface

Keyboard shortcuts

Chat history per thread

💥 Project Impact

AIVid dramatically improves the way users extract information from video content.

🚀 Productivity

Transforms a 20–30 minute video into 5-second insights, saving time and effort.

🎯 Accuracy

RAG grounding ensures all answers come directly from the transcript.
Perfect for research, content creators, and knowledge workers.

🧱 Full-Stack AI Engineering

This project demonstrates strong skills in:

LLM agents & tool-calling

RAG system architecture

Vector databases (PgVector + Neon)

Scalable backend design

Frontend chat UI development

Cloud deployment using Render

A strong portfolio project that appeals to recruiters and showcases end-to-end AI engineering capability.

🧠 High-Level Architecture
React Frontend (ai-vid-frontend)
      ↓  /generate
Express Backend (server)
      ↓
LangChain AI Agent
      ↓
Custom "retrieve" Tool
      ↓
PgVector (Neon)
      ↓
Bright Data Transcript Scraper

📁 Project Structure
root/
│
├── ai-vid-frontend/
│     └── src/
│
└── server/
      ├── agent.js
      ├── index.js
      ├── embeddings.js
      ├── package.json


This README has been tailored to match your exact repo layout.

⚙️ Backend Setup (server/)
1. Install dependencies
cd server
npm install

2. Create .env
OPENAI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
BRIGHT_DATA_TOKEN=your_token
DB_URL=your_neon_pgvector_connection_string
NODE_ENV=production

3. Start backend locally
node agent.js


or (if using index.js)

node index.js


Backend runs at:

http://localhost:3000

🎨 Frontend Setup (ai-vid-frontend/)
1. Install dependencies
cd ai-vid-frontend
npm install

2. Create .env
VITE_API_URL=https://aivid.onrender.com

3. Run dev server
npm run dev


Frontend runs at:

http://localhost:5173

🚀 Deployment (Render + Neon)
✔ Frontend (Render Static Site)

Repo root points to /ai-vid-frontend

Build command: npm run build

Publish directory: dist

Add env VITE_API_URL=https://aivid.onrender.com

✔ Backend (Render Web Service)

Root directory: /server

Start command: node index.js

Add all .env variables in Render dashboard

✔ Database (Neon)

PgVector enabled

Stores transcript embeddings

Used for similarity search + filtering by video_id

🔌 API Example
POST /generate

Request:

{
  "query": "What will people learn from this video?",
  "thread_id": 1,
  "video_id": "fuhE6PYnRMc"
}


Response:

"Here’s what the video teaches..."

📝 License

MIT License
