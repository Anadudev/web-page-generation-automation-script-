const express = require("express");
const promptDatabase = require("./database/promptDatabase.json");
const {writeFile, createDir, readFile} = require("./utils/fileCRUD");
const replaceLines = require("./utils/replaceLines");
const path = require("path");
const consoleInfo = require("./utils/consoleInfo");
const files = require("./config/files");
const {tracker, getTrack} = require("./tracking/tracker");
const sitemapRouter = require("./routes/sitemapRoutes.js");

const app = express();
const PORT = 3000;
let index = getTrack();
let trials = 0;
app.use(express.json());

// create article folder to store generated pages
let dirPath = path.join(process.cwd(), "article");
createDir("../article").then(r => console.log(`article directory created successfully: ${dirPath}`));

/**
 * Main function that generates an HTML file based on a prompt in the promptDatabase.
 * It reads the file structure from the htmlStructureFile, replaces lines in the file
 * structure with the appropriate data from the prompt, and saves the resulting HTML file
 * in the article folder.
 *
 * @return {Promise<void>} Promise that resolves when the file is generated and saved.
 */
const main = async () => {
    try {
        if (index > 1000) {
            console.log(`Index: ${index} page generation completed successfully!`);
            return;
        }
        console.log("Starting new page generation❗...");
        const htmlFileStructure = await readFile(files.htmlStructureFile);

        const interval = await consoleInfo(`Read ${files.htmlStructureFile} file ✅ successfully`, index);

        const {pageName, pageContent} = await replaceLines(
            promptDatabase[index],
            htmlFileStructure
        );
        console.info(`Page data setup completed ✅`);

        writeFile(`../article/${pageName}.html`, pageContent);
        interval.stop();
        process.stdout.write("\r✅ Done!          \n");
        index = index + 1;
        tracker(index);
        if (trials > 0) {
            trials = 0;
        }
        main();
    } catch (err) {
        index = getTrack();
        if (trials < 5) {

            console.log(`Attempting to generate index: ${index} again for the ${trials + 1} time...`);
            setTimeout(() => {
                main();
                trials = trials + 1;
            }, 1000);
        } else {
            // continue generation next 24hr
            console.log("Continuing generation next 24hr...");
            setTimeout(() => {
                main();
            }, 60000 * 60 * 24);
        }
        console.error(err);
    }
};

// main();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is running",
        index,
        info: `currently at index: ${index}`
    });
});

app.use("/", sitemapRouter);

app.listen(3000, "0.0.0.0", () => {
    console.log(`Server running at  http://localhost:${PORT}`);
});
