
const extractQuestion = ( title ) => {
	const questionMarkIndex = title.indexOf( "?" );

	return questionMarkIndex !== -1 ? title.substring( 0, questionMarkIndex ) : title;
};

module.exports = extractQuestion;
