async function send() {
  const input = document.getElementById("input");
  const chatBox = document.getElementById("chat-box");

  const message = input.value.trim();
  if (!message) return;

  // Show user message
  chatBox.innerHTML += `<div class="msg user">${message}</div>`;

  input.value = "";

  // Call API
  const res = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  // Show bot reply
  chatBox.innerHTML += `<div class="msg bot">${data.reply}</div>`;

  chatBox.scrollTop = chatBox.scrollHeight;
}
