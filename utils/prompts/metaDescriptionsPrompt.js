const modelPromptConstructor = require("../../ai/prompt");
const promptModel = require("../../ai/promptModel");

const metaDescriptionsPrompt = async (contextJsonData, htmlFile, promptContext) => {
    const prompt = `You are an expert HTML content modifier. Your only task is to update the inner text content of the provided HTML document. Follow these rules exactly.
    For the provided HTML document, your task is to update only the content attribute of the <meta name="description"> tag, guided by the context and values in the provided JSON object.
    
    JSON Object:
    ${contextJsonData}
    
    📌 Content Transformation Rules
    Primary Objective:
    - Update the content of the <meta name="description"> tag to a maximum of 160 characters.
    
    🧠 Meta & Technical Enhancements
    - The description must highlight benefits and include keywords relevant to (${contextJsonData["Topic - what the generated page is about"]}) and (${contextJsonData["Description"]}).
    - The description should be a concise summary of the page's content, aimed at attracting clicks from a search engine results page (SERP).
    
    🧰 Direct Insertion Rules (Strict)
    - For the <meta name="description"> tag:
    - Summarize the benefits of (${contextJsonData["Description"]}) relating to  (${contextJsonData["Topic - what the generated page is about"]}).
    
    Final Output Format:
    Return the complete HTML document with only the updated content attribute of the <meta name="description"> tag. Do not alter any HTML tags, attributes, or document structure, or add extra completely new elements.
    
    Html to work with: ${htmlFile}`;

    return (await promptModel(modelPromptConstructor(prompt, promptContext)));
};

module.exports = metaDescriptionsPrompt;