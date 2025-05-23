const API_BASE = "http://localhost:8000";

document.getElementById("promptForm").onsubmit = async (e) => {
    e.preventDefault();
    const prompt = document.getElementById("promptInput").value;
    if (!prompt) return;
    await fetch(`${API_BASE}/prompts/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    document.getElementById("promptInput").value = ""; // Limpa o campo
    fetchHistory(); // Atualiza o histórico
};

// Submit on Enter (without Shift) in promptInput
const promptInput = document.getElementById("promptInput");
promptInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        document.getElementById("promptForm").dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}));
    }
});

async function fetchHistory() {
    const res = await fetch(`${API_BASE}/prompts/`);
    const data = await res.json();
    const historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "";
    data.forEach(item => {
        const block = document.createElement("div");
        block.style.marginBottom = "1em";
        // Prompt clickable, response hidden by default
        const promptEl = document.createElement("div");
        promptEl.innerHTML = `<strong>Prompt:</strong> <pre style='display:inline'>${item.prompt}</pre>`;
        promptEl.style.cursor = "pointer";
        promptEl.style.userSelect = "none";
        const responseEl = document.createElement("div");
        responseEl.innerHTML = `<strong>Response:</strong> <pre>${item.response}</pre>`;
        responseEl.style.display = "none";
        // Toggle response on click
        promptEl.onclick = () => {
            responseEl.style.display = responseEl.style.display === "none" ? "block" : "none";
        };
        block.appendChild(promptEl);
        block.appendChild(responseEl);
        historyDiv.appendChild(block);
    });
}

// Carrega o histórico ao abrir a página
fetchHistory();

