const modelPromptConstructor = require("../../ai/prompt");
const promptModel = require("../../ai/promptModel");

const heroPrompt = async (contextJsonData, htmlFile, promptContext) => {
    const prompt = `You are an expert HTML content modifier. Your only task is to update the inner text content of the provided HTML document. Follow these rules exactly.

    For the provided HTML document, your task is to update only the inner text content of all HTML tags within the hero section. In this case, the hero section is identified by the <div class="main-hero-grid">. Use the values from the provided JSON object to guide this update.
    
    JSON Object:
    ${contextJsonData}
    
    📌 Content Transformation Rules
    Primary Objective:
    - Update the inner text content of the HTML tags within the <div class="main-hero-grid"> element only.
    - Every sentence, heading, or paragraph within this section must follow this structure: Genuine long-tail question? Answer.
    
    🔑 Keyword Optimization
    - Embed relevant long-tail keywords naturally. Use the following:
    - ${contextJsonData["Topic - what the generated page is about"]}
    - ${contextJsonData["Description"]}
    
    🧰 Direct Insertion Rules (Strict)
    - For the <h1> inside <div class="main-hero-grid">:
    - Generate a long-tail question using the ${contextJsonData} values.
- Include one SEO keyword from ${contextJsonData["Topic - what the generated page is about"]} ${contextJsonData["Description"]}.
    
    📝 All Content Blocks Must:
    - Follow the format: Genuine long-tail question? Answer.
    - Be written with clarity, precision, and readability.
    
    🎯 Button Text:
    - Use clear, conversion-oriented labels example but not limited to “Apply Now” or “Get Started”.
    
    Final Output Format:
    Return the complete HTML document with only the updated inner text content of the hero section. Do not alter any HTML tags, attributes, or document structure, or add extra completely new elements.
    
    Html to work with: ${htmlFile}`;

    return (await promptModel(modelPromptConstructor(prompt, promptContext)));
};

module.exports = heroPrompt;