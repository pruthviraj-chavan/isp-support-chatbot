const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.continuous = false;

let isListening = false;

function updateStatus(message, isError = false) {
    const statusIndicator = document.getElementById('status-indicator');
    statusIndicator.textContent = message;
    statusIndicator.className = `status-indicator ${isError ? 'error' : ''}`;
    setTimeout(() => {
        statusIndicator.textContent = '';
    }, 3000);
}

function updateVoiceButton(isActive) {
    const voiceBtn = document.getElementById('voice-btn');
    voiceBtn.innerHTML = isActive ? 
        '<i class="fas fa-microphone-slash"></i>' : 
        '<i class="fas fa-microphone"></i>';
    voiceBtn.classList.toggle('active', isActive);
}

function startListening() {
    if (!isListening) {
        try {
            recognition.start();
            isListening = true;
            updateVoiceButton(true);
            updateStatus('Listening...');
        } catch (error) {
            updateStatus('Error starting voice recognition', true);
        }
    } else {
        recognition.stop();
        isListening = false;
        updateVoiceButton(false);
    }
}

recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('user-input').value = transcript;
    sendMessage();
};

recognition.onend = function() {
    isListening = false;
    updateVoiceButton(false);
};

recognition.onerror = function(event) {
    updateStatus('Error with voice recognition: ' + event.error, true);
    isListening = false;
    updateVoiceButton(false);
};

function addMessage(content, isUser = false) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${content}
        </div>
    `;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage(message, true);
    input.value = '';
    
    updateStatus('Sending message...');
    
    fetch('http://127.0.0.1:5000/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    })
    .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    })
    .then(data => {
        addMessage(data.response);
        speak(data.response);
        updateStatus('');
    })
    .catch(error => {
        updateStatus('Error sending message: ' + error.message, true);
        addMessage('Sorry, I encountered an error. Please try again.', false);
    });
}

function speak(text) {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.0;
    utter.pitch = 1.0;
    synth.speak(utter);
}

// Handle Enter key press
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
