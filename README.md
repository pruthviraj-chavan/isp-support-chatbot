# ISP Support Chatbot

A modern, interactive chatbot interface for ISP customer support with voice and text input capabilities.

## Features

- 💬 Real-time chat interface
- 🎤 Voice input support
- 🔊 Text-to-speech responses
- 📱 Responsive design for all devices
- 🤖 Natural Language Processing with Wit.ai
- 🎨 Modern, clean UI with animations

## Prerequisites

- Python 3.8 or higher
- Node.js (optional, for development)
- Wit.ai account and API token

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd isp-support-chatbot
```

2. Set up the backend:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Configure Wit.ai:
   - Create a Wit.ai account at https://wit.ai
   - Create a new app and get your API token
   - Replace the `WIT_AI_TOKEN` in `backend/app.py` with your token

## Running the Application

1. Start the backend server:
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python3 app.py
```

2. In a new terminal, serve the frontend:
```bash
cd frontend
python3 -m http.server 8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## Project Structure

```
isp-support-chatbot/
├── backend/
│   ├── app.py              # Flask backend server
│   ├── intents.json        # Chatbot intents and responses
│   ├── requirements.txt    # Python dependencies
│   └── venv/              # Python virtual environment
├── frontend/
│   ├── index.html         # Main HTML file
│   └── script.js          # Frontend JavaScript
└── static/
    └── style.css          # CSS styles
```

## Usage

1. **Text Input**:
   - Type your message in the input field
   - Press Enter or click the send button

2. **Voice Input**:
   - Click the microphone button
   - Speak your message
   - The bot will automatically process your voice input

3. **Supported Intents**:
   - Bill payment queries
   - Internet speed issues
   - Connection problems
   - General support

## Development

### Adding New Intents

1. Update `backend/intents.json` with new intent patterns
2. Train your Wit.ai model with the new patterns
3. Add corresponding responses in the intents file

### Customizing the UI

- Modify `static/style.css` for styling changes
- Update `frontend/index.html` for structural changes
- Edit `frontend/script.js` for functionality changes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Wit.ai for natural language processing
- Flask for the backend framework
- Font Awesome for icons
