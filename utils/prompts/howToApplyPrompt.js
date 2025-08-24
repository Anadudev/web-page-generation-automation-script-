const modelPromptConstructor = require("../../ai/prompt");
const promptModel = require("../../ai/promptModel");

const howToApplyPrompt = async (contextJsonData, htmlFile, promptContext) => {
    const prompt = `You are an expert HTML content modifier. Your only task is to update the inner text content of the provided HTML document. Follow these rules exactly.
    For the provided HTML document, your task is to update only the inner text content of the HTML tags within the "How to apply" section. This section is identified by the main heading, subheadings, list items (<li>), paragraphs (<p>), and any related button text. Use the context and values in the provided JSON object to guide this update.
    
    JSON Object:
    ${contextJsonData}
    
    📌 Content Transformation Rules
    Primary Objective:
    - Update only the inner text of HTML tags within the "How to apply" section.
    - Every sentence, heading, or paragraph must follow this structure: Genuine long-tail question? Answer.
    - Use the provided JSON data to generate content related to the application process for the specified loan and sector.
    
    🔑 Keyword Optimization
    - Embed relevant long-tail keywords naturally:
    - ${contextJsonData["Topic - what the generated page is about"]}
    - ${contextJsonData["Description"]}
    
    📝 Content Structure & Quality
    - Add a one-sentence TL;DR summary before detailed answers.
    - Use active voice and comparison phrases, e.g., “Unlike traditional loans…”
    - All content blocks must be self-contained Q&A blocks.
    - Ensure the content is clear, precise, and readable.
    - The content should guide a user through the application process step-by-step.
    
    🎯 Button Text:
    - Use clear, conversion-oriented labels example but not limited to “Apply Now” or “Get Started”.
    
    Final Output Format:
    Return the complete HTML document with only the updated inner text content of the "How to apply" section. Do not alter any HTML tags, attributes, or document structure, or add extra completely new elements.
    
    Html to work with: ${htmlFile}`;

    return (await promptModel(modelPromptConstructor(prompt, promptContext)));
};

module.exports = howToApplyPrompt;