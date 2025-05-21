# Prompt Manager

A minimal local project for managing code prompts with a local AI model via Ollama.

## Features

- Submit code prompts and get responses from a local AI model (e.g., TinyLlama, Phi via Ollama)
- View prompt/response history
- Simple browser-based interface
- All data stored locally in SQLite

## Requirements

- Python 3.8+
- Node.js (optional, for future frontend expansion)
- Ollama installed and running (`ollama run tinyllama` or `ollama run phi`)

## Setup

1. **Install backend dependencies:**

    ```sh
    cd backend
    pip install -r requirements.txt
    ```

2. **Start Ollama with a lightweight model:**

    ```sh
    ollama run tinyllama
    # or for another lightweight model:
    ollama run phi
    ```

3. **Run the backend:**

    ```sh
    uvicorn main:app --reload
    ```

4. **Open `frontend/index.html` in your browser.**
   (You may need to serve it with a simple HTTP server to avoid CORS issues.)

    ```sh
    cd frontend
    python -m http.server 8080
    # Then visit http://localhost:8080/
    ```

## Notes

- Change the model in `backend/ollama_client.py` if you want a different one.
- For analytics and more features, extend the FastAPI endpoints and frontend as needed.