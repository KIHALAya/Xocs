import { GoogleGenerativeAI } from '@google/generative-ai'; 
import {generateEmbedding} from './embeddings.js';
import { parseExpoDocs } from './parseExpoDocs.js';
import supabase from './supabase.js';
import slugs from './slugs.js';  


const genAI = new GoogleGenerativeAI(process.env.GoogleAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "embedding-001"});



// handleDoc : This function will take a slug as input, parse the content of the document using parseExpoDocs, embed the content using the Google AI model, and store the embedding in the database.
const handleDoc = async(slug) => {
    const data = await parseExpoDocs(slug);
  
    // Generate the vector using the Google AI model
    const vector = await generateEmbedding(data.body);

    // Store the vector in the database
    const { error } = await supabase
        .from('docs')
        .insert([
            { id: slug,
             title: data.attributes.title,
             url: `https://docs.expo.dev/${slug}`,
             vector
            }
        ])
        .select();

    console.log(error);
}



const handleAllDocs = async() => {
    await Promise.all(slugs.map(slug => handleDoc(slug)));
}

handleAllDocs();