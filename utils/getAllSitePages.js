const fs = require("fs").promises;

exports.getNewFilenames = async (directoryPath, prefix) => {
    try {
        let files = await fs.readdir(directoryPath);

        files = files
            .filter(file => file.endsWith(".html"))
            .map(file => {
                return `
            "${prefix}${file}"`;
            });

        return files;
    } catch (err) {
        console.error(`Error reading directory: ${err}`);
        return []; // Return an empty array in case of error
    }
};
