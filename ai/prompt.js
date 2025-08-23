const modelPromptConstructor = (prompt, promptContext) => {

    return `${prompt}
    
    
    Page Context:
    
    The context below is to ensure the content is relevant to the page.
	here is a context of what the page would contain
	${promptContext}
	`;
};


module.exports = modelPromptConstructor;
