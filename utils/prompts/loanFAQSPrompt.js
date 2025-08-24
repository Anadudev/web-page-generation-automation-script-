const modelPromptConstructor = require("../../ai/prompt");
const promptModel = require("../../ai/promptModel");

const loanFAQSPrompt = async (contextJsonData, htmlFile, promptContext) => {
    const prompt = `You are an expert HTML content modifier. Your only task is to update the inner text content of the provided HTML document. Follow these rules exactly.
    For the provided HTML document, your task is to update only the inner text content of the HTML tags within the "Loan FAQ" section. This section should address common user questions about the specified loan and sector, and is typically composed of a heading, questions, and answers. Use the context and values in the provided JSON object to guide this update.
    
    JSON Object:
    ${contextJsonData}
    
    📌 Content Transformation Rules
    Primary Objective:
    - Update only the inner text of HTML tags within the "Loan FAQ" section.
    - Every content block must follow this structure: Genuine long-tail question? Answer.
    - Use the provided JSON data to generate frequently asked questions and their corresponding answers.
    
    🔑 Keyword Optimization
    - Embed relevant long-tail keywords naturally:
    - ${contextJsonData["Topic - what the generated page is about"]}
    - ${contextJsonData["Description"]}
    
    📝 Content Structure & Quality
    - Add a one-sentence TL;DR summary before each detailed long answer.
    - All content blocks must be self-contained Q&A blocks.
    - Ensure the content is clear, precise, and readable.
    - The questions should be genuine, long-tail questions that users would search for.
    
    Final Output Format:
    Return the complete HTML document with only the updated inner text content of the "Loan FAQ" section. Do not alter any HTML tags, attributes, or document structure, or add extra completely new elements.
    
    Html to work with: ${htmlFile}`;

    return (await promptModel(modelPromptConstructor(prompt, promptContext)));
};

module.exports = loanFAQSPrompt;