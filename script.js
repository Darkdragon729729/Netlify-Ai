async function send() {
  const input = document.getElementById("input");
  const chatBox = document.getElementById("chat-box");

  const message = input.value.trim();
  if (!message) return;

  // Show user message
  chatBox.innerHTML += `<div class="msg user">${message}</div>`;
  input.value = "";

  try {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    // ✅ FIX HERE
    const reply = data.reply || data.error || "No response from AI";

    chatBox.innerHTML += `<div class="msg bot">${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    chatBox.innerHTML += `<div class="msg bot">Error: Server issue</div>`;
  }
}
