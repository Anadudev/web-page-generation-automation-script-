const { aiModel } = require( "../config/config" );

const promptModel = async ( prompt ) => {
	const response = await aiModel.models.generateContent( {
		model: "gemini-2.5-flash",
		contents: prompt,
	} );
	return { response, text: response.text };
};

module.exports = promptModel;
