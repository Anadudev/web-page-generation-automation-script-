/**
 * This is a Node.js script that finds and removes the first of two <head> tags
 * in all HTML files within a specified directory.
 *
 * To run this script:
 * 1. Make sure you have Node.js installed on your system.
 * 2. Save this code as a file, for example, `fix-html.js`.
 * 3. Place the script in the directory you want to process, or update the `directoryPath` variable.
 * 4. Open your terminal or command prompt, navigate to the directory, and run the command:
 * `node fix-html.js`
 *
 * It's highly recommended to back up your files before running this script.
 */

const fs = require("fs");
const path = require("path");

// =================================================================================
// Configuration
// =================================================================================

// The directory to search for HTML files.
// Use '.' to process the current directory where the script is located.
const directoryPath = "./";

// =================================================================================
// Main Logic
// =================================================================================

/**
 * A regular expression to find all instances of the <head> tag and its contents.
 * The 'g' flag ensures all matches are found.
 * The 'i' flag makes the search case-insensitive.
 * The 's' flag (dotall) allows '.' to match newlines, which is crucial for multi-line tags.
 * The '?' makes the quantifier non-greedy, so it matches the smallest possible string.
 */
const headTagRegex = /<head[\s\S]*?<\/head>/gis;

/**
 * Processes a single HTML file to remove the first of two <head> tags.
 *
 * @param {string} filePath - The full path to the file.
 * @returns {void}
 */
function processFile(filePath) {
    try {
        // Read the file content as a string.
        const fileContent = fs.readFileSync(filePath, "utf8");

        // Find all matches for the head tag.
        const matches = fileContent.match(headTagRegex);

        // Check if the file contains exactly two <head> tags.
        if (matches && matches.length === 2) {
            console.log(`Found two <head> tags in: ${filePath}`);

            // The first match is the one we want to remove.
            const firstHeadTag = matches[0];

            // Replace the first match with an empty string to remove it.
            const modifiedContent = fileContent.replace(firstHeadTag, "");

            // Write the modified content back to the file.
            fs.writeFileSync(filePath, modifiedContent, "utf8");
            console.log(`--> Successfully removed the first <head> tag.`);
        } else {
            // If the file does not have exactly two <head> tags, skip it.
            console.log(`Skipping file: ${filePath} (found ${matches ? matches.length : 0} <head> tags).`);
        }
    } catch (error) {
        // Log any errors that occur during file processing.
        console.error(`Error processing file ${filePath}: ${error.message}`);
    }
}

/**
 * Main function to find and process all HTML files in the specified directory.
 */
function main() {
    console.log(`Starting process in directory: ${directoryPath}`);

    try {
        // Read all items in the directory.
        const files = fs.readdirSync(directoryPath);

        // Filter the list to include only .html files.
        const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === ".html");

        if (htmlFiles.length === 0) {
            console.log("No HTML files found in the specified directory.");
            return;
        }

        console.log(`Found ${htmlFiles.length} HTML files to check.`);
        console.log("---------------------------------------------------");

        // Iterate over each HTML file and process it.
        htmlFiles.forEach(file => {
            const filePath = path.join(directoryPath, file);
            processFile(filePath);
            console.log("---------------------------------------------------");
        });

        console.log("Processing complete.");

    } catch (error) {
        console.error(`Error reading directory: ${error.message}`);
    }
}

// Execute the main function.
main();
