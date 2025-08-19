const { GoogleGenAI } = require( "@google/genai" );
require( 'dotenv' ).config();

const apiKey = process.env.MODEL_KEY;
console.log(`My api key id ${apiKey}`)
const aiModel = new GoogleGenAI( { apiKey } );

module.exports = { aiModel };
