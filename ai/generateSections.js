const htmlSections = require("../database/htmlSections");
const titlePrompt = require("../utils/prompts/titlePrompt");
const metaDescriptionsPrompt = require("../utils/prompts/metaDescriptionsPrompt");
const heroPrompt = require("../utils/prompts/heroPrompt");
const howItWorksPrompt = require("../utils/prompts/howItWorksPrompt");
const whatKindOfLoansAreAvailablePrompt = require("../utils/prompts/whatKindOfLoansAreAvailablePrompt");
const howToApplyPrompt = require("../utils/prompts/howToApplyPrompt");
const eligibilityPrompt = require("../utils/prompts/eligibilityPrompt");
const advantagesPrompt = require("../utils/prompts/advantagesPrompt");
const disadvantagesPrompt = require("../utils/prompts/disadvantagesPrompt");
const whereToGetPrompt = require("../utils/prompts/whereToGetPrompt");
const loanAlternativesPrompt = require("../utils/prompts/loanAlternativesPrompt");
const whySettleForLessPrompt = require("../utils/prompts/whySettleForLessPrompt");
const loanFAQSPrompt = require("../utils/prompts/loanFAQSPrompt");
const promptModel = require("./promptModel");



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

const generateSections = async (contextJsonData, promptContext) => {

    console.log(`Generating page sections...`);
    const sections = await Promise.all([
        titlePrompt(title, contextJsonData, promptContext),
        metaDescriptionsPrompt(metaDescriptions, contextJsonData, promptContext),
        heroPrompt(hero, contextJsonData, promptContext),
        howItWorksPrompt(howItWorks, contextJsonData, promptContext),
        whatKindOfLoansAreAvailablePrompt(whatKindOfLoansAreAvailable, contextJsonData, promptContext),
        howToApplyPrompt(howToApply, contextJsonData, promptContext),
        eligibilityPrompt(eligibility, contextJsonData, promptContext),
        advantagesPrompt(advantages, contextJsonData, promptContext),
        disadvantagesPrompt(disadvantages, contextJsonData, promptContext),
        whereToGetPrompt(whereToGet, contextJsonData, promptContext),
        loanAlternativesPrompt(loanAlternatives, contextJsonData, promptContext),
        whySettleForLessPrompt(whySettleForLess, contextJsonData, promptContext),
        loanFAQSPrompt(loanFAQS, contextJsonData, promptContext)
    ]);
    console.log(`Page sections generated.`);

    return {
        title: sections[0],
        metaDescriptions: sections[1],
        hero: sections[2],
        howItWorks: sections[3],
        whatKindOfLoansAreAvailable: sections[4],
        howToApply: sections[5],
        eligibility: sections[6],
        advantages: sections[7],
        disadvantages: sections[8],
        whereToGet: sections[9],
        loanAlternatives: sections[10],
        whySettleForLess: sections[11],
        loanFAQS: sections[12]
    };
};

module.exports = generateSections;
