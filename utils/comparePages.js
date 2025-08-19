let { default: stringComparison } = require( 'string-comparison' );
// or import stringComparison from 'string-comparison'

/**
 * Compares two strings representing web pages, and returns a measure of their
 * similarity.
 *
 * The similarity measure is a cosine similarity score between the two strings.
 * Cosine similarity is a measure of similarity between two non-zero vectors of
 * an inner product space that measures the cosine of the angle between them.
 *
 * @param {string} page1 - The first page to compare
 * @param {string} page2 - The second page to compare
 * @return {number} - The cosine similarity between the two pages, ranging from
 * 0 (completely dissimilar) to 1 (completely similar)
 */
exports.comparePages = ( page1, page2 ) => {
	let cos = stringComparison.cosine;
	const results = cos.similarity( page1, page2 );
	return results;
};
