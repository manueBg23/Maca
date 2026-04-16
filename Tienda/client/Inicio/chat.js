function toggleChat() {
    const chat = document.getElementById('chat-window');
    chat.classList.toggle('hidden-chat');
}

function handleKeyPress(e) {
    if (e.key === 'Enter') sendMessage()
}

async function sendMessage() {
    const input = document.getElementById('user-input')
    const message = input.value.trim()
    if (!message) return;

    appendMessage(message, 'user-message');
    input.value = '';

    try {
        const response = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        appendMessage(data.response, 'bot-message');
    } catch (error) {
        appendMessage("Lo siento, tengo problemas para conectarme", 'bot-message');
    }
}

function appendMessage(text, className) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${className}`;
    
    if (text.includes('LINK|')) {
        const lineas = text.split('\n')
        let htmlContent = "He encontrado esto para ti: <br>";

        lineas.forEach(linea => {
            if (linea.startsWith('LINK|')) {
                const [_, nombre, precio, tipo] = linea.split('|');

                let carpeta = tipo.toLowerCase();
                if (carpeta === "anillo") carpeta = "Anillos";
                if (carpeta === "aretes") carpeta = "aretesR";
                if (carpeta === "aretes san agustin") carpeta = "Aretes San Agustin"
                if (carpeta === "earcuff") carpeta = "Earcuff"
                if (carpeta === "manillas") carpeta = "Manillas"
                if (carpeta === "miniearcuff") carpeta = "Mini Earcuff"
                
                htmlContent += `
                    <div class="product-link">
                        <a href="../${carpeta}/${carpeta}.html" class="bot-btn">
                        View ${nombre} - $${precio}
                        </a>
                    </div>`;
            }
        });
        div.innerHTML = htmlContent;
    } else {
        div.innerText = text;
    }

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}