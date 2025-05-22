# Prompt Manager

A minimal local project for managing code prompts with a local LLM or external LLM API.

## Features

- Submit code prompts and get responses from a local or external AI model (LLM agnostic)
- View prompt/response history
- Simple browser-based interface
- All data stored locally in SQLite

## Requirements

- Python 3.8+
- Node.js (optional, for future frontend expansion)
- Access to a local or external LLM (e.g., Ollama, OpenAI, Hugging Face, etc.)

## Setup

1. **Install backend dependencies:**

    ```sh
    cd backend
    pip install -r requirements.txt
    ```

2. **Configure your LLM provider:**

    - For a local LLM, ensure the service is running and accessible (e.g., Ollama, LM Studio, etc.).
    - For an external API, set your API key as an environment variable (e.g., `OPENAI_API_KEY`).
    - Update `backend/ollama_client.py` (or create a new client) to use your preferred LLM provider.

3. **Run the backend:**

    ```sh
    python -m uvicorn main:app --reload
    ```

4. **Open `frontend/index.html` in your browser.**
   (You may need to serve it with a simple HTTP server to avoid CORS issues.)

    ```sh
    cd frontend
    python -m http.server 8080
    # Then visit http://localhost:8080/
    ```

## Notes (Llama/Ollama Specific)

- To use Ollama with a lightweight model:
    ```sh
    ollama run tinyllama
    # or for another lightweight model:
    ollama run phi
    ```
- Update the model name in `backend/ollama_client.py` if you want a different one.
- For analytics and more features, extend the FastAPI endpoints and frontend as needed.