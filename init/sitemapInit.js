const {getNewFilenames} = require("../utils/getAllSitePages");
const files = require("../config/files");
const {writeFile} = require("../utils/fileCRUD");
require("dotenv").config();

const mainDirectory = files.basePath;
const articleDirectory = files.articlePath;
const myPrefix = "https://www.contigocf.com/";
const myPrefix2 = `${myPrefix}article/`;

getNewFilenames(mainDirectory, myPrefix)
    .then((newArray) => {
        console.log("Original files with new prefix stored in array:");
        // console.log(newArray);
        getNewFilenames(articleDirectory, myPrefix2)
            .then(async (newArray2) => {
                console.log("Original files with new prefix stored in array:");
                // console.log(newArray2);
                const allPages = `[${[`"${myPrefix}"`, ...newArray, ...newArray2]}]`;
                // console.log("All site pages:", allPages);
                await writeFile(`../database/sitePages.js`, `module.exports = ${allPages}`);
                // console.log(allPages);
            })
            .catch(error => {
                console.error("An error occurred:", error);
            });
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });
