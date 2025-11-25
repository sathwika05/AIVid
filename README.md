🚀 AI-Vid
AI Agent That Converts Video Transcripts Into Actionable Insights

AI-Vid is an AI-powered video-understanding system that collects video transcripts, stores them in a vector database, and answers questions using RAG (Retrieval-Augmented Generation).
It transforms long videos into clear, accurate, context-aware insights — instantly.

🔥 Features

Bright Data Scraping → Automatically extract video transcript + metadata

RAG Pipeline → High-accuracy contextual answers

LLM-Powered Agent → Natural, human-like responses

Video-Scoped Search → Queries retrieve only chunks matching the current video_id

Frontend + Backend → Full-stack production-ready setup

Fast API Responses → Hosted on Render for quick testing and demos

🧠 Tech Stack
Backend

Node.js (Express)

LangChain + JSON Schema Tools / Agent

Nomic Embed (for embeddings)

pgvector on Neon Postgres

Bright Data (video scraping)

Render Deployment

Frontend

React + Vite (or Next.js if your frontend uses it)

Custom chat UI

Fetch API to your agent endpoint

LLM Used

OpenAI GPT-4.1 (or your current model) for final reasoning + answer generation

Nomic Embed for embedding transcript chunks

RAG retrieval powered by pgvector similarity search

📦 Project Structure
ai-vid/
│
├── ai-vid-frontend/
│   └── src/...
│
└── server/
    ├── agent.js
    ├── db.js
    └── utils/

⚙️ How It Works
1. Scrape Video Transcript

Bright Data fetches transcript + metadata → stored in your DB.

2. Chunk + Embed

Transcript is chunked and embedded using Nomic embed.

3. Store in pgvector

Stored inside Neon Postgres table containing:

id

video_id

content

embedding vector

4. Query the Agent

The agent retrieves ONLY the video content that matches the provided video_id:

const retrievedDocs = await vectorStore.similaritySearch(
  query,
  3,
  (doc) => doc.metadata.video_id === video_id
);

5. LLM Generates Final Answer

GPT-4.1 produces a concise, accurate answer grounded in transcript data.

🚀 Running Locally
Backend
cd server
npm install
node agent.js

Frontend
cd ai-vid-frontend
npm install
npm run dev

🛠 Environment Variables

Create a .env inside /server:

OPENAI_API_KEY=
BRIGHT_DATA_KEY=
DATABASE_URL=

🌍 Deployment
Backend

Deploy to Render

Use Web Service

Add environment variables

Point your frontend to the Render URL

Frontend

Deploy to Vercel / Netlify / Render Static Site

📌 Example Prompt

User:

"What will people learn from this video?"

AI-Vid:
(Uses video transcript + RAG to answer accurately)

📈 Impact

AI-Vid turns long videos into instant knowledge, enabling:

Faster research

Better content understanding

Automated summarization

Stronger learning productivity

Video-based Q&A apps

Video search engines

AI study assistants

🤝 Contributing

PRs welcome!
Feel free to open issues, improve accuracy, or enhance the UI.

📜 License

MIT License
