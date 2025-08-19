const cleanupModelResponse = ( response ) => {
	// 2. Remove all occurrences of "```html"
	//    The 'g' flag in the regex ensures global replacement
	let updatedContent = response.replace( /```html/g, "" );

	// 3. Remove all occurrences of "```"
	updatedContent = updatedContent.replace( /```/g, "" );
	return updatedContent;
};

module.exports = cleanupModelResponse;
