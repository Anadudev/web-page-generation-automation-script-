const htmlSections = require( "../database/htmlSections" );
const titlePrompt = require( "../utils/prompts/titlePrompt" );
const metaDescriptionsPrompt = require( "../utils/prompts/metaDescriptionsPrompt" );
const heroPrompt = require( "../utils/prompts/heroPrompt" );
const howItWorksPrompt = require( "../utils/prompts/howItWorksPrompt" );
const whatKindOfLoansAreAvailablePrompt = require( "../utils/prompts/whatKindOfLoansAreAvailablePrompt" );
const howToApplyPrompt = require( "../utils/prompts/howToApplyPrompt" );
const eligibilityPrompt = require( "../utils/prompts/eligibilityPrompt" );
const advantagesPrompt = require( "../utils/prompts/advantagesPrompt" );
const disadvantagesPrompt = require( "../utils/prompts/disadvantagesPrompt" );
const whereToGetPrompt = require( "../utils/prompts/whereToGetPrompt" );
const loanAlternativesPrompt = require( "../utils/prompts/loanAlternativesPrompt" );
const whySettleForLessPrompt = require( "../utils/prompts/whySettleForLessPrompt" );
const loanFAQSPrompt = require( "../utils/prompts/loanFAQSPrompt" );
const promptModel = require( "./promptModel" );



let {
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
} = htmlSections;

const generateSections = async ( contextJsonData, promptContext ) => {

    console.log( `Generating page sections...` );
    const sections = await Promise.all( [
        titlePrompt( contextJsonData, title, promptContext ),
        metaDescriptionsPrompt( contextJsonData, metaDescriptions, promptContext ),
        heroPrompt( contextJsonData, hero, promptContext ),
        howItWorksPrompt( contextJsonData, howItWorks, promptContext ),
        whatKindOfLoansAreAvailablePrompt( contextJsonData, whatKindOfLoansAreAvailable, promptContext ),
        howToApplyPrompt( contextJsonData, howToApply, promptContext ),
        eligibilityPrompt( contextJsonData, eligibility, promptContext ),
        advantagesPrompt( contextJsonData, advantages, promptContext ),
        disadvantagesPrompt( contextJsonData, disadvantages, promptContext ),
        whereToGetPrompt( contextJsonData, whereToGet, promptContext ),
        loanAlternativesPrompt( contextJsonData, loanAlternatives, promptContext ),
        whySettleForLessPrompt( contextJsonData, whySettleForLess, promptContext ),
        loanFAQSPrompt( contextJsonData, loanFAQS, promptContext )
    ] );
    console.log( `Page sections generated.` );

    return {
        title: sections[ 0 ],
        metaDescriptions: sections[ 1 ],
        hero: sections[ 2 ],
        howItWorks: sections[ 3 ],
        whatKindOfLoansAreAvailable: sections[ 4 ],
        howToApply: sections[ 5 ],
        eligibility: sections[ 6 ],
        advantages: sections[ 7 ],
        disadvantages: sections[ 8 ],
        whereToGet: sections[ 9 ],
        loanAlternatives: sections[ 10 ],
        whySettleForLess: sections[ 11 ],
        loanFAQS: sections[ 12 ]
    };
};

module.exports = generateSections;
