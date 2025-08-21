const { GoogleGenAI } = require( "@google/genai" );
require( 'dotenv' ).config();

const apiKey = process.env.MODEL_KEY;
const aiModel = new GoogleGenAI( { apiKey } );

module.exports = { aiModel };
