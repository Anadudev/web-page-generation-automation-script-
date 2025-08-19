const modelPromptConstructor = ( htmlFile, contextJsonData ) => {

	const prompt = `You are an expert HTML content modifier. Your only task is to update the inner text content of the provided HTML document. Follow these rules exactly.

				For the provided HTML document, your task is to update only the inner text content of all relevant visible HTML tags, guided by the context and values in the provided JSON object.

				The JSON is a contextual guide for what the page should communicate. Use it to generate natural, question-driven language rather than direct insertions — unless otherwise specified.

				JSON Object:
				${ contextJsonData }

				📌 Content Transformation Rules

				Primary Objective:
				Every sentence, heading, or paragraph must follow this structure:
				genuine long-tail question? Answer.
				Each HTML text element (e.g. "< h1 > ", " < p > ", " < li > ", " < meta > ") must be a self-contained Q&A block reflecting ${ contextJsonData[ "Sector" ] }, ${ contextJsonData[ "Loan Attributes" ] }, ${ contextJsonData[ "Intent & Financial Context" ] }, and ${ contextJsonData[ "City" ] }.

				🔑 Keyword Optimization
				- Embed relevant long-tail keywords naturally:
				- ${ contextJsonData[ "City" ] } ${ contextJsonData[ "Sector" ] } ${ contextJsonData[ "Loan Attributes" ] }
				- UK elderly care property financing
				- ${ contextJsonData[ "Loan Attributes" ] } for ${ contextJsonData[ "Sector" ] } ${ contextJsonData[ "Intent & Financial Context" ] }
				- Use them in titles, headers, paragraphs, meta tags, and FAQ questions.

				📄 Content Structure & Quality
				- Add TL;DR summaries before detailed answers.
				- Use active voice and comparison phrases  e.g., “Unlike traditional loans…”
				- Replace compound phrases( e.g., use “cash - flow” instead of “cash flow” ).

				🧠 Meta & Technical Enhancements
				- Update< title >  and  < meta name = "description" > :
				- Title should include${ contextJsonData[ "City" ] } ${ contextJsonData[ "Sector" ] } ${ contextJsonData[ "Loan Attributes" ] }  and be under 60 characters.
				- Description should highlight benefits and keywords in under 160 characters.
				- Ensure heading structure follows hierarchy: < h1 >  >  < h2 >  >  < h3 > , with keyword-rich questions.

				🧰 Direct Insertion Rules (Strict)
				- For < h1 >  inside  < div class="main-hero-grid" > :
				- Generate a long-tail question using the ${ contextJsonData } values.
				- Include one SEO keyword like ${ contextJsonData[ "City" ] } ${ contextJsonData[ "Sector" ] } ${ contextJsonData[ "Loan Attributes" ] } .
				- For < meta name = "description" > :
				- Summarize the benefits of ${ contextJsonData[ "Loan Attributes" ] }  for ${ contextJsonData[ "Sector" ] } ${ contextJsonData[ "Intent & Financial Context" ] } in ${ contextJsonData[ "City" ] }.
				- For <h3> inside <div class="featured-grid__item">:
				- Keep text short and relevant.

				📝 All Content Blocks Must:
				- Follow the format: Genuine long - tail question ? Answer.	- Start complex sections with a one - sentence TL; DR.
				- Include keyword - rich phrasing.
				- Be written with clarity, precision, and readability.

				🎯 Button Text:
				- Use clear, conversion - oriented labels like “Compare Rates” or “Check Eligibility”

				Final Output Format:
				Return the complete HTML document with only updated inner text content.Do not alter any HTML tags, attributes, or document structure or add extra completely new elements.
				Html to work with: ${ htmlFile } `;

	return prompt;
};

module.exports = modelPromptConstructor;
