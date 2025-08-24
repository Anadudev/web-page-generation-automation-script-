// convert.js

const csv = require("csvtojson");
const path = require("path");
const fs = require("fs");

// Define the path to your CSV file
const csvFilePath = "../database/v2/data.csv";

// Check if the CSV file exists
if (!fs.existsSync(csvFilePath)) {
    console.error(`Error: The file "${csvFilePath}" was not found.`);
    console.log("Please create a 'data.csv' file in the same directory as the script.");
    process.exit(1);
}

// Convert the CSV file to a JSON array
csv()
    .fromFile(csvFilePath)
    .then((jsonArrayObj) => {
        // This `jsonArrayObj` is the JSON array of objects
        // console.log(jsonArrayObj);
        fs.writeFileSync(`../database/v2/promptDatabase.json`, JSON.stringify(jsonArrayObj, null, 2));
        // You can optionally save the output to a JSON file
        // const jsonOutputPath = path.resolve(__dirname, 'output.json');
        // fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonArrayObj, null, 2));
        // console.log(`\nSuccessfully converted and saved to "${jsonOutputPath}"`);
    })
    .catch((err) => {
        console.error("An error occurred during conversion:", err);
    });