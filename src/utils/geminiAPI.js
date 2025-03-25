/**
 * Utility functions for interacting with Google's Gemini API
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Use explicit API key for now - IMPORTANT: ROTATE THIS KEY IMMEDIATELY AFTER TESTING
const GEMINI_API_KEY = "AIzaSyBWhMlD_ghIaZSv0hTjt0A0CD7pEkfcaaU";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// Use gemini-1.5-pro which is the correct model name in the latest API
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

/**
 * Sends a message to Gemini API and returns the response
 * 
 * @param {string} message - The user's message to send to Gemini
 * @returns {Promise<string>} - The response from Gemini
 */
export const getGeminiResponse = async (message) => {
    try {
        // Log the API key (partial) for debugging - only first 4 chars
        const keyPreview = GEMINI_API_KEY ? `${GEMINI_API_KEY.substring(0, 4)}...` : 'undefined';
        console.log(`Using Gemini API key starting with: ${keyPreview}`);

        // Validate API key
        if (!GEMINI_API_KEY) {
            throw new Error("API key is missing. Please check your environment variables.");
        }

        // Construct the prompt to send to Gemini
        const prompt = `You are a movie recommender chatbot. You should recommend movies based on the user's input.
    Be friendly and conversational. Ask clarifying questions if the input is vague.
    If the user provides genres, actors, directors, or plot keywords, use those to find relevant movies.
    Provide a title, a brief (1-2 sentence) description, and if possible, a reason for the recommendation.
    Avoid recommending movies the user has explicitly said they dislike.
    Keep responses concise and engaging. If you don't know, say you don't know.

    User input: ${message}`;

        // Send the prompt to the Gemini API
        console.log("Sending request to Gemini API...");
        const result = await model.generateContent(prompt);

        if (!result || !result.response) {
            throw new Error("Received empty response from Gemini API");
        }

        const responseText = result.response.text();
        console.log("Successfully received response from Gemini API");

        return responseText;
    } catch (error) {
        console.error("Error communicating with Gemini API:", error);

        // Provide more detailed error information
        const errorMessage = error.message || "Unknown error";

        if (errorMessage.includes("network") || error.code === "ECONNABORTED") {
            return "Network error. Please check your internet connection.";
        } else if (errorMessage.includes("429") || error.status === 429) {
            return "Too many requests. Please try again in a moment.";
        } else if (errorMessage.includes("API key")) {
            return "There's an issue with the API key. Please contact the administrator.";
        } else if (errorMessage.includes("model not found") || errorMessage.includes("not found for API version") || errorMessage.includes("does not exist")) {
            return "The AI model configuration is incorrect. Please check the model name and API version.";
        }

        // Return a user-friendly message instead of throwing
        return `Sorry, I couldn't process your request. Error: ${errorMessage}`;
    }
};
