# Advanced AI Chatbot Setup Guide

## Overview
The Web Sondrya website now features an advanced AI-powered chatbot that provides intelligent responses to visitor inquiries. The chatbot uses Google's Gemini API for natural language understanding and can maintain conversation context across multiple messages.

## Features
✅ **AI-Powered Responses** - Powered by Google Gemini API
✅ **Conversation Context** - Maintains chat history for coherent conversations
✅ **Fallback System** - Intelligent rule-based responses if API fails
✅ **Dark Mode Support** - Adapts to your website's theme
✅ **Responsive Design** - Works perfectly on mobile and desktop
✅ **Real-time Typing Indicator** - Shows when AI is thinking
✅ **Error Handling** - Graceful fallback with helpful messages
✅ **Session Management** - Unique session IDs for each user

## Architecture

### Frontend (Client-side)
- **File**: `js/main.js` (Advanced Chatbot class)
- **Features**:
  - Sends user messages to backend API
  - Maintains conversation history
  - Displays typing indicators while waiting
  - Handles message sanitization for security
  - Provides local fallback responses

### Backend (Server-side)
- **File**: `websondrya-backend/routes/chatbotRoutes.js`
- **Features**:
  - Integrates with Google Generative AI (Gemini)
  - Manages conversation contexts per session
  - Implements system prompt for business context
  - Provides rule-based fallback responses
  - Automatic context cleanup (every hour)

### Database
- Uses conversation context stored in memory (suitable for production with Redis)
- Session-based conversation management

## Installation & Setup

### 1. Get Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Sign in with your Google account
3. Click "Create API key"
4. Copy your API key

### 2. Update Environment Variables

Edit `websondrya-backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/websondrya
GEMINI_API_KEY=paste_your_api_key_here
```

### 3. Install Dependencies

```bash
cd websondrya-backend
npm install
```

### 4. Start the Backend Server

```bash
npm run dev
# or for production
npm start
```

The server will run on `http://localhost:5000`

### 5. Update Frontend API Endpoint

If using a different backend URL, update in `js/main.js`:
```javascript
this.apiEndpoint = 'http://your-backend-url/api/chatbot/chat';
```

## API Endpoint

### POST `/api/chatbot/chat`

**Request Body:**
```json
{
  "message": "What services do you offer?",
  "sessionId": "session_xyz123"
}
```

**Response:**
```json
{
  "response": "We offer Web Development, Web Designing, Graphic Designing, Digital Marketing, Branding, SEO Services, and Social Media Management."
}
```

## Customization

### Change Chatbot Personality

Edit the `SYSTEM_PROMPT` in `websondrya-backend/routes/chatbotRoutes.js`:

```javascript
const SYSTEM_PROMPT = `You are an advanced AI assistant for Web Sondrya...
// Add your custom instructions here
`;
```

### Modify Fallback Responses

In `websondrya-backend/routes/chatbotRoutes.js`, update the `generateFallbackResponse()` function to add more keywords and responses.

### Customize Frontend UI

Edit chatbot styles in `css/style.css` (lines 941-1150):
- Change colors in `#chatbot-header` gradient
- Adjust window size
- Modify message bubble styling

### Add Custom Welcome Message

Update in `js/main.js` in the `openChat()` method:
```javascript
const greeting = "Your custom greeting message here";
```

## Testing

### Test the Chatbot Locally

1. Start the backend: `npm run dev` (in websondrya-backend folder)
2. Open your website in a browser
3. Click the chatbot button (bottom-right)
4. Type a message and press Enter
5. Watch the AI respond!

### Test Conversations

Try these questions:
- "What services do you offer?"
- "How much does the Pro plan cost?"
- "Can you help me with web development?"
- "How do I get in touch?"
- "Tell me about your portfolio"

### Verify API Connection

Check browser console (F12 > Console) for any errors:
- CORS errors usually mean backend isn't running
- API errors mean invalid Gemini API key
- Network errors mean wrong endpoint

## Production Deployment

### Important Security Updates

1. **Update CORS in backend** (`server.js`):
```javascript
app.use(cors({
    origin: 'https://your-domain.com',
    credentials: true
}));
```

2. **Use Environment Variables**:
   - Store API keys securely
   - Use `.env.production` for production

3. **Implement Session Storage**:
   - Replace in-memory storage with Redis for production
   - Add session expiration logic

4. **Add Rate Limiting**:
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/chatbot', limiter);
```

5. **Monitor API Usage**:
   - Set up alerts for high API usage
   - Track costs with Google Cloud Console

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Chatbot not responding | Check if backend is running on port 5000 |
| "AI service unavailable" | Verify Gemini API key in `.env` |
| CORS errors | Ensure backend `cors()` is configured correctly |
| Typing indicator stuck | Check browser console for errors |
| Message not sending | Verify `/api/chatbot/chat` endpoint exists |

## Performance Optimization

### For Production:

1. **Add Message Queue**: Use Bull for job queue
2. **Cache Responses**: Implement response caching
3. **Use Redis**: Replace in-memory session storage
4. **Add Logging**: Implement proper logging system
5. **Monitor Costs**: Track Gemini API usage

### Frontend Optimization:

1. Compress chatbot bundle
2. Lazy load chatbot script
3. Implement message debouncing
4. Add local message caching

## API Costs

Google Gemini API is free tier with usage limits:
- **Free Tier**: 60 requests per minute
- **Paid Tier**: $0.0015 per input token, $0.0009 per output token

Monitor your usage in [Google Cloud Console](https://console.cloud.google.com/)

## Future Enhancements

- [ ] Add multilingual support
- [ ] Implement user authentication
- [ ] Add email integration
- [ ] Support file uploads
- [ ] Add sentiment analysis
- [ ] Implement conversation export
- [ ] Add voice chat support
- [ ] Create admin dashboard for chat analytics

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console errors (F12)
3. Check server logs
4. Verify API key validity

---

**Last Updated**: February 2026
**Version**: 2.0 (Advanced AI)
