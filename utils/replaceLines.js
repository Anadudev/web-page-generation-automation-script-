const { randomUUID } = require( "crypto" );
const generateSections = require( "../ai/generateSections" );

const generatePageSlug = require( "./generatePageSlug" );
const cleanupModelResponse = require( "./cleanUpMOdelResponse" );
const titlePrompt = require( "./prompts/titlePrompt" );
const metaDescriptionsPrompt = require( "./prompts/metaDescriptionsPrompt" );
const promptModel = require( "../ai/promptModel" );
const promptContextPrompt = require( "./prompts/index" );
const generatedContexts = require( "../database/contexts.json" );
const { findSimilarPage } = require( "./comparePages" );
const { writeFile } = require( "./fileCRUD" );
const { extractHtmlTextContent } = require( "./extractHtmlTextContent" );

/* <!-- title section -->
        2,       <!--meta descriptions section-->
        3,     <!-- canonical tag -->
        4,             <!-- Hero section -->
        5,               <!-- How do business work section -->
        6,               <!-- what kind of business loans are available -->
        7,         <!-- How to apply for a business loan -->
        8,              <!-- Business loan eligibility -->
        9,               <!-- advantages of business laon -->
        10,               <!-- Disadvantages of business loan -->
        11,               <!-- Where to get a business loan -->
        12,               <!-- Alternatives to Business Loans -->
        13,               <!-- Why Settle for Less? -->
        14,               <!-- Business loan FAQs -->
 */

const replaceLines = async ( contextJsonData, data, index ) => {

    let promptContext = promptContextPrompt( contextJsonData );
    promptContext = cleanupModelResponse( ( await promptModel( promptContext ) ).text );
    promptContext = extractHtmlTextContent( promptContext );

    const oldIndex = index - 1;
    const similarityThreshold = 0.33;

    let oldPromptContext = generatedContexts[ oldIndex ];
    console.log( `Performing page comparison...` );
    if ( index > 0 && ( oldPromptContext[ `promptContext${ oldIndex }` ] ||
        oldPromptContext[ `promptContext${ oldIndex }` ] === index ) )
    {
        console.log( `Similar page found: ${ oldPromptContext.pageContext }` );
        return;
    }

    const { similarity, similarPage } = findSimilarPage( generatedContexts, `${ promptContext }`, similarityThreshold );

    generatedContexts.push( {
        [ `promptContext${ index }` ]: index,
        "similarity": similarity,
        "similarPage": similarPage ? similarPage[ Object.keys( similarPage )[ 0 ] ] : null,
        "published": similarity >= similarityThreshold,
        pageContext: promptContext
    } );

    await writeFile( "./database/contexts.json", JSON.stringify( generatedContexts, null, 2 ) );
    console.log( `Page comparison completed.` );
    if ( similarity >= similarityThreshold )
    {
        console.log( `Similar page found: ${ similarPage[ Object.keys( similarPage )[ 0 ] ] }` );
        return;
    };


    // const pageId = randomUUID().substring(0, 8);

    console.log( `Processing page content insertion...` );
    let lines = data.split( "\n" );
    const line1 = 24;
    const line2 = 25;
    const line3 = 48; //<link href="../small-business-loans.html" rel="canonical" />
    const line4 = 3749;
    const line5 = 3758;
    const line6 = 3767;
    const line7 = 3773;
    const line8 = 3786;
    const line9 = 3797;
    const line10 = 3807;
    const line11 = 3844;
    const line12 = 3853;
    const line13 = 3860;
    const line14 = 3867;

    // console.log(`
    //     1, ${lines[line1]}
    //     2, ${lines[line2]}
    //     3, ${lines[line3]}
    //     4, ${lines[line4]}
    //     5, ${lines[line5]}
    //     6, ${lines[line6]}
    //     7, ${lines[line7]}
    //     8, ${lines[line8]}
    //     9, ${lines[line9]}
    //     10, ${lines[line10]}
    //     11, ${lines[line11]}
    //     12, ${lines[line12]}
    //     13, ${lines[line13]}
    //     14, ${lines[line14]}
    //     `);
    // return;

    const {
        title,
        metaDescriptions,
        hero,
        howItWorks,
        whatKindOfLoansAreAvailable,
        howToApply,
        eligibility,
        advantages,
        disadvantages,
        whereToGet,
        loanAlternatives,
        whySettleForLess,
        loanFAQS
    } = await generateSections( contextJsonData, promptContext );

    // extract h1 text for page name
    const match = hero.text.match( /<h1[^>]*>([\s\S]*?)<\/h1>/ );
    const h1TextRegex = match ? match[ 1 ].trim() : null;
    // console.log( h1TextRegex );

    let pageName = contextJsonData[ "URL-Slug" ].replace( /^\//, "" );//generatePageSlug(h1TextRegex);

    lines[ line1 ] = title.text;
    lines[ line2 ] = metaDescriptions.text;
    lines[ line3 ] = `<link href="https://www.contigocf.com${ contextJsonData[ "URL-Slug" ] }" rel="canonical" />`;
    lines[ line4 ] = hero.text;
    lines[ line5 ] = howItWorks.text;
    lines[ line6 ] = whatKindOfLoansAreAvailable.text;
    lines[ line7 ] = howToApply.text;
    lines[ line8 ] = eligibility.text;
    lines[ line9 ] = advantages.text;
    lines[ line10 ] = disadvantages.text;
    lines[ line11 ] = whereToGet.text;
    lines[ line12 ] = loanAlternatives.text;
    lines[ line13 ] = whySettleForLess.text;
    lines[ line14 ] = loanFAQS.text;
    // pageName = contextJsonData["URL-Slug"].replace(/^\//, "");
    // pageName = contextJsonData["URL-Slug"]//`${pageName}-${pageId}`;

    const fileHtmlData = lines.join( "\n" );
    const pageContent = cleanupModelResponse( fileHtmlData );
    console.log( `Page content insertion completed.` );

    return { pageName, pageContent };
};

module.exports = replaceLines;
