const explainBtn = document.getElementById("explainBtn");
const inputText = document.getElementById("inputText");
const output = document.getElementById("output");
const loading = document.getElementById("loading");

const modeMap = {
  "explain like I'm 5": "Explain this like I'm five years old.",
  bullets: "Summarize this in 5 bullet points.",
  translate: "Translate this into plain English.",
  corporate: "Rewrite this in professional corporate language suitable for a business meeting or client presentation."
};

explainBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();
  if (!text) return alert("Please paste some text to explain.");

  const selectedBtn = document.querySelector(".mode-btn.selected");
  const selectedMode = selectedBtn?.dataset.mode || "explain like I'm 5";
  const prompt = `${modeMap[selectedMode]}\n\n${text}`;

  output.innerText = "";
  loading.classList.remove("hidden");

  try {
    const response = await fetch("/api/explain.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        mode: selectedMode
      })
    });

    const data = await response.json();
    const result = data.result || "No response received.";

    const bubble = document.createElement("div");
    bubble.classList.add("chat-bubble");
    bubble.innerText = result;
    output.appendChild(bubble);

  } catch (err) {
    console.error(err);
    const bubble = document.createElement("div");
    bubble.classList.add("chat-bubble");
    bubble.innerText = "⚠️ Error: Could not fetch explanation.";
    output.appendChild(bubble);
  } finally {
    loading.classList.add("hidden");
  }
});
