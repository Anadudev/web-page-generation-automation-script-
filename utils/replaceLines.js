const { randomUUID } = require( "crypto" );
const generateSections = require( "../ai/generateSections" );
const generatePageSlug = require( "./generatePageSlug" );
const cleanupModelResponse = require( "./cleanUpMOdelResponse" );

const replaceLines = async ( contextJsonData, data ) => {

	const pageId = randomUUID().substring( 0, 8 );


	let lines = data.split( "\n" );
	const line1 = 15;
	const line2 = 16;
	const line3 = 3740;
	const line4 = 3749;
	const line5 = 3758;
	const line6 = 3764;
	const line7 = 3777;
	const line8 = 3788;
	const line9 = 3798;
	const line10 = 3834;
	const line11 = 3843;
	const line12 = 3850;
	const line13 = 3857;
	// console.log( `
	//     1, ${ line1 }
	//     2, ${ line2 }
	//     3, ${ line3 }
	//     4, ${ line4 }
	//     5, ${ line5 }
	//     6, ${ line6 }
	//     7, ${ line7 }
	//     8, ${ line8 }
	//     9, ${ line9 }
	//     10, ${ line10 }
	//     11, ${ line11 }
	//     12, ${ line12 }
	//     13, ${ line13 }
	//     `);
	// return;


	const { title, metaDescriptions, hero, howItWorks, whatKindOfLoansAreAvailable, howToApply, eligibility, advantages, disadvantages, whereToGet, loanAlternatives, whySettleForLess, loanFAQS } = await generateSections( contextJsonData );

	// extract h1 text for page name
	const match = hero.text.match( /<h1[^>]*>([\s\S]*?)<\/h1>/ );
	const h1TextRegex = match ? match[ 1 ].trim() : null;
	// console.log( h1TextRegex );

	let pageName = generatePageSlug( h1TextRegex );

	lines[ line1 ] = title.text;
	lines[ line2 ] = metaDescriptions.text;
	lines[ line3 ] = hero.text;
	lines[ line4 ] = howItWorks.text;
	lines[ line5 ] = whatKindOfLoansAreAvailable.text;
	lines[ line6 ] = howToApply.text;
	lines[ line7 ] = eligibility.text;
	lines[ line8 ] = advantages.text;
	lines[ line9 ] = disadvantages.text;
	lines[ line10 ] = whereToGet.text;
	lines[ line11 ] = loanAlternatives.text;
	lines[ line12 ] = whySettleForLess.text;
	lines[ line13 ] = loanFAQS.text;

	pageName = `${ pageName }-${ pageId }`;
	const fileHtmlData = lines.join( "\n" );
	const pageContent = cleanupModelResponse( fileHtmlData );

	return { pageName, pageContent };
};

module.exports = replaceLines;
