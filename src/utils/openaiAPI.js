/**
 * Utility functions for interacting with A4F OpenAI-compatible API
 */

import OpenAI from 'openai';

// A4F API configuration from environment variables
const A4F_API_KEY = import.meta.env.VITE_A4F_API_KEY;
const A4F_BASE_URL = import.meta.env.VITE_A4F_BASE_URL || "https://api.a4f.co/v1";

// Initialize the OpenAI client with A4F configuration
const client = new OpenAI({
    apiKey: A4F_API_KEY,
    baseURL: A4F_BASE_URL,
    dangerouslyAllowBrowser: true,
});

/**
 * Sends a message to A4F API and returns the response
 * 
 * @param {string} message - The user's message to send to the AI
 * @returns {Promise<string>} - The response from the AI
 */
export const getAIResponse = async (message) => {
    try {
        // Log the API key (partial) for debugging - only first 4 chars
        const keyPreview = A4F_API_KEY ? `${A4F_API_KEY.substring(0, 4)}...` : 'undefined';
        console.log(`Using A4F API key starting with: ${keyPreview}`);

        // Validate API key
        if (!A4F_API_KEY) {
            throw new Error("API key is missing. Please check your configuration.");
        }

        // Send the request to the A4F API
        console.log("Sending request to A4F API...");
        const completion = await client.chat.completions.create({
            model: "provider-5/gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are a movie recommender chatbot. You should recommend movies based on the user's input.
Be friendly and conversational. Ask clarifying questions if the input is vague.
If the user provides genres, actors, directors, or plot keywords, use those to find relevant movies.
Provide a title, a brief (1-2 sentence) description, and if possible, a reason for the recommendation.
Avoid recommending movies the user has explicitly said they dislike.
Keep responses concise and engaging. If you don't know, say you don't know.`
                },
                {
                    role: "user",
                    content: message
                }
            ]
        });

        if (!completion || !completion.choices || !completion.choices[0]) {
            throw new Error("Received empty response from A4F API");
        }

        const responseText = completion.choices[0].message.content;
        console.log("Successfully received response from A4F API");

        return responseText;
    } catch (error) {
        console.error("Error communicating with A4F API:", error);

        // Provide more detailed error information
        const errorMessage = error.message || "Unknown error";

        if (errorMessage.includes("network") || error.code === "ECONNABORTED") {
            return "Network error. Please check your internet connection.";
        } else if (errorMessage.includes("429") || error.status === 429) {
            return "Too many requests. Please try again in a moment.";
        } else if (errorMessage.includes("API key") || errorMessage.includes("unauthorized")) {
            return "There's an issue with the API key. Please contact the administrator.";
        } else if (errorMessage.includes("model not found") || errorMessage.includes("not found for API version") || errorMessage.includes("does not exist")) {
            return "The AI model configuration is incorrect. Please check the model name and API version.";
        }

        // Return a user-friendly message instead of throwing
        return `Sorry, I couldn't process your request. Error: ${errorMessage}`;
    }
};
