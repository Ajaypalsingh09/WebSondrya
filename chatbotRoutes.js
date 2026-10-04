import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Store conversation context for better responses
const conversationContexts = {};

// Initialize Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "your_api_key_here";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// System prompt that makes the AI understand Web Sondrya's services
const SYSTEM_PROMPT = `You are an advanced AI assistant for Web Sondrya, a full-service digital agency. 

Web Sondrya Services:
1. Web Development - Custom websites and web applications using modern technologies
2. Web Designing - Beautiful, responsive, and user-friendly designs
3. Graphic Designing - Logos, banners, and creative visual content
4. Digital Marketing - SEO, social media, content marketing, and paid advertising
5. Branding - Build strong brand identity and guidelines
6. SEO Services - Optimize websites for search engine rankings
7. Social Media Management - Content creation, engagement, and growth strategies

Pricing Plans:
- Basic: ₹5,000 (Web Design, Basic SEO, 1 Month Support)
- Pro: ₹15,000 (Full Web Development, Advanced SEO, 6 Months Support)
- Enterprise: ₹50,000 (Custom Solutions, Full Marketing, 1 Year Support)

Contact Information:
- Email: Available on our website
- Phone: Available on our website
- Website: Web Sondrya
- Social Media: Facebook, Twitter, LinkedIn, Instagram

Guidelines:
- Always be professional and helpful
- Focus on Web Sondrya's services when relevant
- Provide accurate information about services and pricing
- If you don't know something, suggest contacting Web Sondrya directly
- Be conversational and friendly
- Limit responses to 2-3 sentences for better readability
- Occasionally ask follow-up questions to understand client needs
- When appropriate, suggest relevant services based on user needs`;

// Advanced chatbot endpoint
router.post("/chat", async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Check if API key is configured
        if (GEMINI_API_KEY === "your_api_key_here") {
            console.warn("⚠️  WARNING: Gemini API key not configured. Using fallback responses only.");
            console.warn("To enable AI responses, set GEMINI_API_KEY in your .env file");
            const fallbackResponse = generateFallbackResponse(message);
            return res.json({ response: fallbackResponse });
        }

        // Create or retrieve conversation context
        if (!conversationContexts[sessionId]) {
            conversationContexts[sessionId] = [];
        }

        const conversationHistory = conversationContexts[sessionId];

        // Add user message to history
        conversationHistory.push({
            role: "user",
            parts: [{ text: message }]
        });

        // Build messages array for Gemini API
        const messages = conversationHistory.map(msg => ({
            role: msg.role === "user" ? "user" : "model",
            parts: msg.parts
        }));

        // Call Gemini API with correct format
        const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
        
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: {
                        text: SYSTEM_PROMPT
                    }
                },
                contents: messages,
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.95,
                    topK: 40,
                    maxOutputTokens: 200,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE",
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE",
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Gemini API Error:", {
                status: response.status,
                statusText: response.statusText,
                error: errorData.error || "Unknown error",
                message: errorData.error?.message || "Check your API key and request format"
            });
            
            // Fallback to rule-based response
            const fallbackResponse = generateFallbackResponse(message);
            conversationHistory.push({
                role: "assistant",
                parts: [{ text: fallbackResponse }]
            });
            return res.json({ response: fallbackResponse });
        }

        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I couldn't generate a response. Please try again.";

        // Add assistant response to history
        conversationHistory.push({
            role: "assistant",
            parts: [{ text: aiResponse }]
        });

        res.json({ response: aiResponse });
    } catch (error) {
        console.error("Chatbot Error:", {
            message: error.message,
            stack: error.stack,
            type: error.name
        });
        const fallbackMessage = "I'm having trouble connecting to the AI service right now. Please try again or contact us directly at our contact page.";
        res.json({ response: fallbackMessage });
    }
});

// Fallback rule-based responses for when API fails
function generateFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();

    const responses = {
        greeting: {
            keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "greetings"],
            responses: [
                "Hello! Welcome to Web Sondrya. How can I help you today?",
                "Hi there! I'm here to assist you with information about our digital services.",
                "Hey! Great to see you. What can I help you with?"
            ]
        },
        pricing: {
            keywords: ["pricing", "price", "cost", "how much", "fee", "rates", "plans"],
            responses: [
                "We offer three pricing plans: Basic (₹5,000), Pro (₹15,000), and Enterprise (₹50,000). Each can be customized. Would you like details on any specific plan?"
            ]
        },
        services: {
            keywords: ["services", "what do you do", "what do you offer", "offerings"],
            responses: [
                "We offer Web Development, Web Designing, Graphic Designing, Digital Marketing, Branding, SEO Services, and Social Media Management. Which service interests you?"
            ]
        },
        contact: {
            keywords: ["contact", "get started", "quote", "hire", "work with", "let's talk"],
            responses: [
                "Great! You can reach us through our contact page or visit our website. We typically respond within 24 hours."
            ]
        },
        portfolio: {
            keywords: ["portfolio", "work", "projects", "examples", "case studies"],
            responses: [
                "Check out our portfolio section to see examples of our recent projects and successful client collaborations!"
            ]
        }
    };

    for (const [key, category] of Object.entries(responses)) {
        if (category.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return category.responses[Math.floor(Math.random() * category.responses.length)];
        }
    }

    return "I'd be happy to help! Could you tell me more about what you're looking for? Feel free to ask about our services, pricing, or portfolio.";
}

// Clear old conversation contexts periodically (every 1 hour)
setInterval(() => {
    const now = Date.now();
    for (const [sessionId, context] of Object.entries(conversationContexts)) {
        if (now - (context.lastActive || 0) > 3600000) {
            delete conversationContexts[sessionId];
        }
    }
}, 3600000);

export default router;
