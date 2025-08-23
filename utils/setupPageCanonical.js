const fs = require("fs");
const {promises: fsp} = require("fs");
const path = require("path");
const searchPattern = /<link\s+href="(.+)"\s+rel="canonical"\s*\/>/;

const setupPageCanonical = (htmlFileName, baseUrl = "https://www.contigocf.com/", filePath = "./") => {
    try {
        console.log(`Reading file: ${filePath}`);
        let fileContent = fs.readFileSync(filePath, "utf8");

        if (searchPattern.test(fileContent)) {
            const newCanonicalLink = `<link href="${baseUrl}${htmlFileName}" rel="canonical" />`;
            console.log("Found the canonical link. Updating...");
            const updatedContent = fileContent.replace(searchPattern, newCanonicalLink);

            fs.writeFileSync(filePath, updatedContent, "utf8");
            console.log("Successfully updated the file!");
        } else {
            console.log("Canonical link not found in the file. No changes made.");
        }
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
};

const main = async () => {
    let files = await fsp.readdir("./");
    if (files[0]) {
        files = files.filter(file => file.endsWith(".html"));
        if (!files[0]) {
            console.log(`No html files found`);
            return;
        }
    } else {
        console.log(`No files found in the directory.`);
        return;
    }
    // console.log(files);
    files.forEach((file) => {
        setupPageCanonical(file, "https://www.contigocf.com/article", `./${file}`);
    });
};

main();

module.exports = setupPageCanonical;
