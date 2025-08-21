const fs = require("fs").promises;

exports.getNewFilenames = async (directoryPath, prefix) => {
    try {
        const files = await fs.readdir(directoryPath);

        const prefixedFilenames = files
            .filter(file => file.endsWith(".html"))
            .map(file => {
                return `
            "${prefix}${file}"`;
            });

        return prefixedFilenames;
    } catch (err) {
        console.error(`Error reading directory: ${err}`);
        return []; // Return an empty array in case of error
    }
};
