const modelPromptConstructor = require("../../ai/prompt");
const promptModel = require("../../ai/promptModel");

const whereToGetPrompt = async (contextJsonData, htmlFile, promptContext) => {
    const prompt = `You are an expert HTML content modifier. Your only task is to update the inner text content of the provided HTML document. Follow these rules exactly.
    For the provided HTML document, your task is to update only the inner text content of the HTML tags within the "Where to get" section. This section should inform users about the sources for the loan and is typically composed of a heading, paragraphs, list items, and possibly button text. Use the context and values in the provided JSON object to guide this update.
    
    JSON Object:
    ${contextJsonData}
    
    📌 Content Transformation Rules
    Primary Objective:
    - Update only the inner text of HTML tags within the "Where to get" section.
    - Every sentence, heading, or paragraph must follow this structure: Genuine long-tail question? Answer.
    - Use the provided JSON data to generate content related to the sources of the specified loan and sector.
    
    🔑 Keyword Optimization
    - Embed relevant long-tail keywords naturally:
    - ${contextJsonData["Topic - what the generated page is about"]}
    - ${contextJsonData["Description"]}
    
    📝 Content Structure & Quality
    - Add a one-sentence TL;DR summary before each detailed answer.
    - All content blocks must be self-contained Q&A blocks.
    - Ensure the content is clear, precise, and readable.
    - The content should clearly list or describe where to get the loan.
    
    🎯 Button Text:
    - Use clear, conversion-oriented labels like “Compare Rates”, “Find Lenders”, or “Get a Quote”.
    
    Final Output Format:
    Return the complete HTML document with only the updated inner text content of the "Where to get" section. Do not alter any HTML tags, attributes, or document structure, or add extra completely new elements.
    
    Html to work with: ${htmlFile}`;

    return (await promptModel(modelPromptConstructor(prompt, promptContext)));
};

module.exports = whereToGetPrompt;