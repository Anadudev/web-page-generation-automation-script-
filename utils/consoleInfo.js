function wait ( ms ) {
	return new Promise( ( resolve ) => setTimeout( resolve, ms ) );
}


/**
 * Logs a message to the console and returns an object with a start method to
 * display a spinner while a process is running and a stop method to stop the
 * spinner.
 *
 * @param {string} message - The message to log to the console.
 * @return {Object} An object with the following properties:
 *   - start: A function that starts displaying a spinner while a process is
 *     running.
 *   - stop: A function that stops the spinner.
 */
const consoleInfo = async ( message, index ) => {
	const spinnerChars = [ "|", "/", "-", "\\" ];
	let i = 0;

	console.log( message );


	const start = setInterval( () => {
		process.stdout.write(
			"\r" + spinnerChars[ i++ ] + ` Page ${index} generation in progress...`
		);
		i = i % spinnerChars.length;
	}, 100 );

	return {
		stop: () => clearInterval( start ),
	};
};

module.exports = consoleInfo;
