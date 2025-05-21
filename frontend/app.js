const API_BASE = "http://localhost:8000";

async function fetchHistory() {
    const res = await fetch(`${API_BASE}/prompts/`);
    const data = await res.json();
    const historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "";
    data.forEach(item => {
        const block = document.createElement("div");
        block.style.marginBottom = "1em";
        block.innerHTML = `
            <strong>Prompt:</strong> <pre>${item.prompt}</pre>
            <strong>Response:</strong> <pre>${item.response}</pre>
        `;
        historyDiv.appendChild(block);
    });
}

document.getElementById("promptForm").onsubmit = async (e) => {
    e.preventDefault();
    const prompt = document.getElementById("promptInput").value;
    if (!prompt) return;
    await fetch(`${API_BASE}/prompts/`, {
        method: "POST",
       
