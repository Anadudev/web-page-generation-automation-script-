const express = require( "express" );
const promptDatabase = require( "./database/v2/promptDatabase.json" );
const { writeFile, createDir, readFile } = require( "./utils/fileCRUD" );
const replaceLines = require( "./utils/replaceLines" );
const path = require( "path" );
const consoleInfo = require( "./utils/consoleInfo" );
const files = require( "./config/files" );
const { tracker, categoryTrack, getTrack, categoryTracker } = require( "./tracking/tracker" );
const { extractHtmlTextContent } = require( "./utils/extractHtmlTextContent" );
const sitemapRouter = require( "./routes/sitemapRoutes.js" );

const app = express();
const PORT = 3000;
let index = getTrack();
let categoryIndex = categoryTrack();
let trials = 0;
app.use( express.json() );

// create article folder to store generated pages
let dirPath = path.join( process.cwd(), "article" );
createDir( "../article" ).then( r => console.log( `article directory created successfully: ${ dirPath }` ) );
// extract categories for tracking
const categories = promptDatabase.map( element => Object.keys( element )[ 0 ] );

const main = async () => {
    try
    {
        if ( index > 1000 )
        {
            console.log( `Index: ${ index } page generation completed successfully!` );
            return;
        }
        console.log( "Starting new page generation❗..." );
        const htmlFileStructure = await readFile( files.htmlStructureFile );

        const interval = await consoleInfo( `Read ${ files.htmlStructureFile } file ✅ successfully`, index );
        // console.log(promptDatabase[1]["Core-Products"][index]);
        // return;
        if ( index === promptDatabase[ categoryIndex ][ categories[ categoryIndex ] ].length )
        {
            categoryIndex = categoryIndex + 1;
            index = 0;
            await categoryTracker( categoryIndex );
            // await tracker( index );
            console.log( `Switching to category: ${ categories[ categoryIndex ] } starting from index: ${ index }` );
        }
        const response = await replaceLines(
            promptDatabase[ categoryIndex ][ categories[ categoryIndex ] ][ index ],
            htmlFileStructure,
            index
        );

        if ( !response )
        {
            if ( trials >= 5 )
            {
                throw new Error( "Failed to generate page after 5 trials" );
            }
            console.log( `Attempting to generate index: ${ index } again for the ${ trials + 1 } time...` );
            trials = trials + 1;
            index = index + 1;
            return main();
        }

        const { pageName, pageContent } = response;
        console.info( `Page data setup completed ✅` );

        writeFile( `../${ pageName }.html`, pageContent );
        interval.stop();
        process.stdout.write( "\r✅ Done!          \n" );
        index = index + 1;
        tracker( index );
        if ( trials > 0 )
        {
            trials = 0;
        }
        main();
    } catch ( err )
    {
        index = getTrack();
        if ( trials < 5 )
        {

            console.log( `Attempting to generate index: ${ index } again for the ${ trials + 1 } time...` );
            setTimeout( () => {
                main();
                trials = trials + 1;
            }, 1000 );
        } else
        {
            // continue generation next 24hr
            console.log( "Continuing generation next 24hr..." );
            setTimeout( () => {
                main();
            }, 60000 * 60 * 24 );
        }
        console.error( err );
    }
};

main();

app.get( "/", ( req, res ) => {
    res.status( 200 ).json( {
        message: "server is running",
        index,
        info: `currently at index: ${ index }`
    } );
} );

app.use( "/", sitemapRouter );

app.listen( 3000, "0.0.0.0", () => {
    console.log( `Server running at  http://localhost:${ PORT }` );
} );
