import fetch from "node-fetch";

// Test the chatbot API
async function testChatbot() {
    try {
        console.log("🧪 Testing Chatbot API...\n");
        
        const response = await fetch("http://localhost:5000/api/chatbot/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "What services do you offer?",
                sessionId: "test_session_123"
            })
        });

        if (!response.ok) {
            console.error("❌ HTTP Error:", response.status, response.statusText);
            const errorText = await response.text();
            console.error("Response:", errorText);
            return;
        }

        const data = await response.json();
        console.log("✅ API Response Received!");
        console.log("🤖 Assistant:", data.response);
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

console.log("Waiting 2 seconds for server to start...");
setTimeout(testChatbot, 2000);
