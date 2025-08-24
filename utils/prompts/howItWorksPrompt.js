const modelPromptConstructor = require("../../ai/prompt");
const promptModel = require("../../ai/promptModel");

const howItWorksPrompt = async (contextJsonData, htmlFile, promptContext) => {
    const prompt = `You are an expert HTML content modifier. Your only task is to update the inner text content of the provided HTML document. Follow these rules exactly.
    For the provided HTML document, your task is to update only the inner text content of the HTML tags within the "How It Works" section, any associated headings or paragraphs. Use the context and values in the provided JSON object to guide this update.
    
    JSON Object:
    ${contextJsonData}
    
    📌 Content Transformation Rules
    Primary Objective:
    - Update only the inner text of HTML tags within the "How It Works" section.
    - Every content block, including headings and paragraphs, must follow this structure: Genuine long-tail question? Answer.
    
    🔑 Keyword Optimization
    - Embed relevant long-tail keywords naturally. Use the following:
    - ${contextJsonData["Topic - what the generated page is about"]}
    - ${contextJsonData["Description"]}
    
    📝 Content Structure & Quality
    - Add a TL;DR summary before each detailed answer.
    - Use active voice and comparison phrases, e.g., “Unlike traditional loans…”
    - All content blocks must be self-contained Q&A blocks.
    - Ensure the content is clear, precise, and readable.
    
    🧰 Direct Insertion Rules (Strict)
    - Generate a keyword-rich, short, and relevant long-tail question related to how the process works.
    
    Final Output Format:
    Return the complete HTML document with only the updated inner text content of the "How It Works" section. Do not alter any HTML tags, attributes, or document structure, or add extra completely new elements.
    
    Html to work with: ${htmlFile}`;

    return (await promptModel(modelPromptConstructor(prompt, promptContext)));
};

module.exports = howItWorksPrompt;