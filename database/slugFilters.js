/**
 * A list of common English stop words. These words are often removed from SEO slugs
 * as they add little value and can make the URL unnecessarily long.
 * @type {string[]}
 */
const slugFilters = [
	"a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "if", "in",
	"into", "is", "it", "no", "not", "of", "on", "or", "such", "that", "the",
	"their", "then", "there", "these", "they", "this", "to", "was", "with"
];

module.exports = slugFilters;
