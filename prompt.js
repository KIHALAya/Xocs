import {generateEmbedding} from './embeddings.js';
import { generateAnswer } from './embeddings.js';
import supabase from './supabase.js';


const buildPrompt = (query, doc_context) => {
    const generalPrompt = 
    "Answer the question in the user query using the given context";

    const user_query = "USER QUERY: ";
    const context = "CONTEXT: ";
    const answer = "ANSWER: ";

    const prompt_template = `
        ${generalPrompt}
        ${user_query}
        ${query}
        ${context}`;
    return prompt_template;
};

const userPrompt = async (input) => {
    //console.log(input);
    const vector = await generateEmbedding(input);
    //console.log(vector.length);
    const filledPrompt = buildPrompt(input, '');
    const completion = await generateAnswer(filledPrompt);

    /**const {data, error} = await supabase.rpc('match_documents', {
        query_embedding: vector,
        match_threshold: 0.2,
        match_count: 2,
    });**/

    console.log(completion);
};


userPrompt("How to deploy?");