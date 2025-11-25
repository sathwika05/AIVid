# 🧠 AI-Vid: AI-Powered Video Insights

A smart, scalable AI agent that uses **RAG (Retrieval-Augmented Generation)** to turn video transcripts into actionable insights. Automatically retrieves relevant transcript chunks and generates context-aware answers—helping users save time and gain knowledge efficiently.

---

## 🚀 Features

### 🎯 AI-Powered RAG Answers
- ✅ Retrieves relevant transcript chunks using **video_id**  
- 📌 Generates context-aware answers with **Anthropic Claude Haiku 4.5**  
- 👥 Ensures accurate and grounded responses  

### 📄 Transcript Processing
- 🧠 Scrapes video transcripts using Bright Data  
- ⚡ Splits transcripts into 1000-character chunks  
- 🔀 Stores metadata for video-specific retrieval  

### 🧩 Embeddings & Storage
- 🔐 Embeds transcript chunks using **OpenAI text-embedding-3-large**  
- 🛠 Stores vectors and metadata in **pgvector (Neon Postgres)**  
- ⚡ Enables fast and scalable similarity search  

### 💬 Interactive Chat
- 💻 React-based chat UI  
- 🎯 Supports video-specific queries for focused answers  
- ⏱ Provides near real-time responses  

---

## 🛠️ Tech Stack

| Layer              | Technology                              |
|-------------------|----------------------------------------|
| **Backend**        | Node.js, Express                        |
| **Frontend**       | ReactJS                                 |
| **Database**       | PostgreSQL + pgvector (Neon)           |
| **Embeddings**     | OpenAI text-embedding-3-large           |
| **LLM**            | Anthropic Claude Haiku 4.5              |
| **Web Scraping**   | Bright Data                              |
| **Deployment**     | Render                                   |

---

## 📝 API Endpoints

### 🔐 Backend
- `GET /health` – Health check endpoint  
- `GET /` – Test endpoint  

### 💬 Generate AI Answer
- `POST /generate` – Send a query and video_id to receive AI-generated answers  
  - **Body Example**:  
  ```json
  {
    "query": "What did people throw in fire to make a bang?",
    "video_id": "fuhE6PYnRMc",
    "thread_id": 1
  }
