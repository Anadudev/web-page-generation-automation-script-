const promptModel = require("../../ai/promptModel");
const modelPromptConstructor = require("../../ai/prompt");
/*{
    "Topic - what the generated page is about": "Compare lenders rates",
    "URL-Slug": "/compare",
    "Description": "Our service specialises in comparing rates from top lenders in under 60s and then negotiating the best rates possible on your side with our seasoned human touch brokerage team."
}*/
const advantagesPrompt = async (contextJsonData, htmlFile, promptContext) => {
    const prompt = `You are an expert HTML content modifier. Your only task is to update the inner text content of the provided HTML document. Follow these rules exactly.
    For the provided HTML document, your task is to update only the inner text content of the HTML tags within the "Advantages" section. This section should highlight the benefits and is typically composed of a heading, paragraphs, and list items. Use the context and values in the provided JSON object to guide this update.

    JSON Object:
    ${contextJsonData}

    📌 Content Transformation Rules
    Primary Objective:
    - Update only the inner text of HTML tags within the "Advantages" section.
    - Every sentence, heading, or paragraph must follow this structure: Genuine long-tail question? Answer.
    - Use the provided JSON data to generate content related to the specific benefits of the loan attributes for the given sector.
    - For the heading <h2 class="text-panel__heading"> should be a question and its answer should be on its immediate following <p> tag.

    🔑 Keyword Optimization
    - Embed relevant long-tail keywords naturally:
    - ${contextJsonData["Topic - what the generated page is about"]}
    - ${contextJsonData["Description"]}

    📝 Content Structure & Quality
    - Add a one-sentence TL;DR summary before each detailed answer.
    - Use active voice and comparison phrases, e.g., “Unlike traditional loans…”
    - All content blocks must be self-contained Q&A blocks.
    - Ensure the content is clear, precise, and readable.
    - The content should clearly highlight the key advantages of the loan type.

    Final Output Format:
    Return the complete HTML document with only the updated inner text content of the "Advantages" section. Do not alter any HTML tags, attributes, or document structure, or add extra completely new elements.

    Html to work with: ${htmlFile}`;

    return (await promptModel(modelPromptConstructor(prompt, promptContext)));
};

module.exports = advantagesPrompt;
