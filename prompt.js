import {generateEmbedding} from './embeddings.js';
import { generateAnswer } from './embeddings.js';
import { parseExpoDocs} from './doc_parser.js';
import supabase from './supabase.js';


const FullPrompt = (query, doc_context) => {
    const generalPrompt = 
    "Answer the question in the user query using the given context";

    const user_query = "USER QUERY: ";
    const context = "CONTEXT: ";
    const answer = "ANSWER: ";

    const prompt_template = `
        ${generalPrompt}
        ${user_query} ${query}
        ${context} ${doc_context}
        ${answer}`;
    return prompt_template;
};

const userPrompt = async (input) => {
    //console.log(input);
    const vector = await generateEmbedding(input);

    const {data, error} = await supabase.rpc('match_documents', {
        query_embedding: vector,
        match_threshold: 0.2,
        match_count: 2,
    });

    const docs = await Promise.all(data.map( doc => parseExpoDocs(doc.id)));
    const doc_bodies = docs.map(doc => doc.body);
    const contents = ''.concat(...doc_bodies);

    //console.log(contents);


    const filledPrompt = FullPrompt(input, contents);
    const answer = await generateAnswer(filledPrompt);

    console.log(answer);
};


userPrompt("Any updates?");