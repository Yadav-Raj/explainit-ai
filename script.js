const explainBtn = document.getElementById("explainBtn");
const inputText = document.getElementById("inputText");
const output = document.getElementById("output");
const loading = document.getElementById("loading");

const modeMap = {
  ELI5: "Explain this like I'm five years old.",
  bullets: "Summarize this in 5 bullet points.",
  translate: "Translate this into plain English.",
  corporate: "Rewrite this in professional corporate language suitable for a business meeting or client presentation."
};

explainBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();
  if (!text) return alert("Please paste some text to explain.");

  const selectedMode = document.querySelector('input[name="mode"]:checked').value;
  const prompt = `${modeMap[selectedMode]}\n\n${text}`;

  output.innerText = "";
  loading.classList.remove("hidden");

  try {
    const response = await fetch("/api/explain", {
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
    output.innerText = data.result || "No response received.";
  } catch (err) {
    console.error(err);
    output.innerText = "⚠️ Error: Could not fetch explanation.";
  } finally {
    loading.classList.add("hidden");
  }
});
