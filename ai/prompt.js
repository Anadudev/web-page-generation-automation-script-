const sitePages = require("../database/sitePages");

const modelPromptConstructor = (prompt, promptContext) => {
    const backlinks = sitePages.splice(((Math.random() + 1) * 50), 10);
    return `${prompt}
    
    	
	For seo and back-linking:
	- Use these links "${backlinks.toString()}" for backlinking to improve seo and ranking
	- Ensure the link matches the context of the part of the page where they are placed
	- Track page context by comparing the url slug to the context of the part they are being implemented

    Page Context:
    
    The context below is to ensure the content is relevant to the page.
	here is a context of what the page would contain

	${promptContext}
	`;
};


module.exports = modelPromptConstructor;
