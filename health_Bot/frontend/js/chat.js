const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage("user", message);
    userInput.value = "";

    const typingDiv = showTyping();

    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        typingDiv.remove();
        addMessage("bot", data.reply);

    } catch (error) {
        typingDiv.remove();
        addMessage("bot", "⚠️ Server not responding. Please try again.");
    }
}

function addMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);

    if (sender === "bot") {
        msgDiv.innerHTML = `
            <img src="./assets/bot.png" class="avatar">
            <div class="bubble">${text}</div>
        `;
    } else {
        msgDiv.innerHTML = `
            <div class="bubble">${text}</div>
            <img src="./assets/user.png" class="avatar">
        `;
    }

    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot");
    typingDiv.innerHTML = `
        <img src="./assets/bot.png" class="avatar">
        <div class="bubble">Typing...</div>
    `;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    return typingDiv;
}
