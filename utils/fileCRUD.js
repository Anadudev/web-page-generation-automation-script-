const fs = require( "fs" );
const { promises: sfs } = require( "fs" );

/**
 * Reads the contents of a file asynchronously.
 *
 * @param {string} path - The path to the file to read.
 * @return {Promise<string>} A promise that resolves with the contents of the file as a UTF-8 encoded string.
 */
const readFile = async ( path ) => {
	const data = await sfs.readFile( path, "utf8" );
	return data;
};

/**
 * Writes the contents of a file asynchronously.
 *
 * @param {string} path - The path to the file to write.
 * @param {string} data - The data to write to the file as a UTF-8 encoded string.
 * @return {Promise<void>} A promise that resolves when the file has been written.
 */
const writeFile = async ( path, data ) => {
	fs.writeFile( path, data, "utf8", ( err ) => {
		if ( err )
		{
			console.error( err );
		} else
		{
			console.log( `Successfully wrote file: ${ path }` );
		}
	} );
};

/**
 * Creates a directory if it does not already exist.
 *
 * @param {string} dirPath - The path of the directory to create.
 * @return {Promise<void>} A promise that resolves when the directory is created or if it already exists.
 */
const createDir = async ( dirPath ) => {
	if ( !fs.existsSync( dirPath ) )
	{
		fs.mkdirSync( dirPath, { recursive: true }, ( err ) => {
			if ( err )
			{
				console.error( "Error creating directory:", err );
			} else
			{
				console.log( `Directory created successfully: ${ dirPath }` );
			}
		} );
	}
};

module.exports = { readFile, writeFile, createDir };
