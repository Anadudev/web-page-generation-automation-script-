const modelPromptConstructor = require("../../ai/prompt");
const promptModel = require("../../ai/promptModel");

const whySettleForLessPrompt = async (contextJsonData, htmlFile, promptContext) => {
    const prompt = `You are an expert HTML content modifier. Your only task is to update the inner text content of the provided HTML document. Follow these rules exactly.
    For the provided HTML document, your task is to update only the inner text content of the HTML tags within the "Why settle for less" section. This section should highlight the disadvantages of traditional lenders and is typically composed of a heading, a subheading, and key points in a structured list or grid. Use the context and values in the provided JSON object to guide this update.
    
    JSON Object:
    ${contextJsonData}
    
    📌 Content Transformation Rules
    Primary Objective:
    - Update only the inner text of HTML tags within the "Why settle for less" section.
    - The main heading should be a long-tail question.
    - The subheadings and key points should be short and relevant.
    
    🔑 Keyword Optimization
    - Embed relevant long-tail keywords naturally:
    - ${contextJsonData["Topic - what the generated page is about"]}
    - ${contextJsonData["Description"]}
    
    📝 Content Structure & Quality
    - The content should clearly highlight the negative aspects of traditional lending.
    - Use active voice and comparison phrases, e.g., “Unlike traditional lenders…”
    - The content should be concise, clear, and easy to read.
    
    Final Output Format:
    Return the complete HTML document with only the updated inner text content of the "Why settle for less" section. Do not alter any HTML tags, attributes, or document structure, or add extra completely new elements.
    
    Html to work with: ${htmlFile}`;

    return (await promptModel(modelPromptConstructor(prompt, promptContext)));
};

module.exports = whySettleForLessPrompt;