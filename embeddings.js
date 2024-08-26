import { GoogleGenerativeAI } from '@google/generative-ai'; 

const genAI = new GoogleGenerativeAI(process.env.GoogleAI_API_KEY);
const embed_model = genAI.getGenerativeModel({ model: "embedding-001"});
const completion_model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateEmbedding = async(input) => {
    const embedding = await embed_model.embedContent(input);
    const vector = embedding.embedding.values;
    return vector;
};

export const generateAnswer = async(prompt) => {
    const answer = await completion_model.generateContent(prompt);
    return answer.response.text();
}