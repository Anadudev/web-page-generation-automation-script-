const modelPromptConstructor = require("../../ai/prompt");
const promptModel = require("../../ai/promptModel");

const titlePrompt = async (contextJsonData, htmlFile, promptContext) => {
    const prompt = `You are an expert HTML content modifier. Your only task is to update the inner text content of the provided HTML document. Follow these rules exactly.

    For the provided HTML document, your task is to update only the inner text content of the HTML <title> tag. Use the values from the provided JSON object to guide this update.
    
    JSON Object:
    ${contextJsonData}
    
    📌 Content Transformation Rules
    Primary Objective:
    - Update the HTML <title> tag's inner text to reflect the key values from the JSON object.
    
    🧠 Meta & Technical Enhancements
    - Update the <title> tag only.
    - Title must be under 60 characters.
    
    🧰 Direct Insertion Rules (Strict)
    - For the <title> tag:
    - The title should include( ${contextJsonData["Topic - what the generated page is about"]} ) and ( ${contextJsonData["Description"]}).
    
    Final Output Format:
    Return the complete HTML document with only the updated inner text content of the <title> tag. Do not alter any HTML tags, attributes, or document structure, or add extra completely new elements.
    
    Html to work with: ${htmlFile}`;

    return (await promptModel(modelPromptConstructor(prompt, promptContext)));
};

module.exports = titlePrompt;
