const { compile } = require( 'html-to-text' );

const options = {
  wordwrap: 130,
};
const compiledConvert = compile( options ); // options passed here

/**
 * Takes an HTML string and returns the text content after being parsed
 * with sensible defaults for line wrapping and ignoring of links.
 *
 * @param {string} html
 * @return {string}
 */
exports.extractHtmlTextContent = ( html ) => {
  return compiledConvert( html );
};
