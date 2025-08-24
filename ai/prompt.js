const modelPromptConstructor = (prompt, promptContext) => {

    return `${prompt}
    
    
    Page Context:
    
    The context below is to ensure the content is relevant to the page.
	here is a context of what the page would contain
	
	For seo and backlinking:
	- Access the link https://www.contigocf.com/sitemap.xml and use relevant links from the page
	${promptContext}
	`;
};


module.exports = modelPromptConstructor;
