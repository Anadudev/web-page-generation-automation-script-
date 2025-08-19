const modelPromptConstructor = require( "../ai/prompt" );
const promptModel = require( "../ai/promptModel" );

const generateSection = async ( section, contextJsonData ) => {
	// console.log( section );
	// console.log( contextJsonData );
	// throw new Error("generateSection not implemented yet");



	const modelPrompt = modelPromptConstructor( section, contextJsonData );
	const modelResponse = await promptModel( modelPrompt );

	return modelResponse;
};

module.exports = generateSection;
