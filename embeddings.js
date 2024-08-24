import { GoogleGenerativeAI } from '@google/generative-ai'; 

const genAI = new GoogleGenerativeAI(process.env.GoogleAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "embedding-001"});

export const generateEmbedding = async(input) => {
    const embedding = await model.embedContent(input);
    const vector = embedding.embedding.values;
    return vector;
};
