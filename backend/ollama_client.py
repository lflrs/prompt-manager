import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "tinyllama"  # Use a lightweight model (e.g., 'tinyllama' or 'phi')

def ask_ollama(prompt: str) -> str:
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False
    }
    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=60)
        response.raise_for_status()
        data = response.json()
        return data.get("response", "").strip()
    except Exception as e:
        return f"Error contacting Ollama: {e}"