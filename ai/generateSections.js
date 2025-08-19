const htmlSections = require( "../database/htmlSections" );
const generateSection = require( "./generateSection" );

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
	loanFAQS,
} = htmlSections;

const generateSections = async ( contextJsonData ) => {
	const sectionPromises = [
		generateSection( title, contextJsonData ),
		generateSection( metaDescriptions, contextJsonData ),
		generateSection( hero, contextJsonData ),
		generateSection( howItWorks, contextJsonData ),
		generateSection( whatKindOfLoansAreAvailable, contextJsonData ),
		generateSection( howToApply, contextJsonData ),
		generateSection( eligibility, contextJsonData ),
		generateSection( advantages, contextJsonData ),
		generateSection( disadvantages, contextJsonData ),
		generateSection( whereToGet, contextJsonData ),
		generateSection( loanAlternatives, contextJsonData ),
		generateSection( whySettleForLess, contextJsonData ),
		generateSection( loanFAQS, contextJsonData ),
	];

	const sections = await Promise.all( sectionPromises );

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
		loanFAQS: sections[ 12 ],
	};
};

module.exports = generateSections;
