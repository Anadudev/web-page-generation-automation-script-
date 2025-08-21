const allPages = require("../database/sitePages");
const {writeFile} = require("../utils/fileCRUD");
const generateSitemap = require("../utils/generateSitemap");

/**
 * Returns all pages in the sitemap.
 * @name getAllPages
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @property {String} message - A human-readable message indicating the result of the request.
 * @property {Array<String>} allPages - An array of all pages in the sitemap.
 * @return {Promise}
 */
exports.getAllPages = async (req, res) => {
    try {
        // console.log(allPages);
        await generateSitemap(allPages);
        res.status(200).json({message: "all pages fetched", allPages});
    } catch (err) {
        res.status(500).json({message: "error fetching all pages", error: err.message});
    }
};

/**
 * Returns a single page from the sitemap.
 * @name getSinglePage
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @property {String} url - The URL of the page to fetch.
 * @property {String} message - A human-readable message indicating the result of the request.
 * @property {String} data - The URL of the page fetched.
 * @return {Promise}
 */
exports.getSinglePage = async (req, res) => {
    try {
        const {url} = req.params;
        const data = allPages.find(page => page === url);
        await generateSitemap(allPages);
        res.status(200).json({message: "single page fetched", data});
    } catch (err) {
        res.status(500).json({message: "error fetching single page", error: err.message});
    }
};

/**
 * Adds a single page to the sitemap.
 * @name generateSitemap
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @property {String} url - The URL of the page to add to the sitemap.
 * @property {String} message - A human-readable message indicating the result of the request.
 * @property {String} data - The URL of the page added to the sitemap.
 * @return {Promise}
 */
exports.generateSitemap = async (req, res) => {
    try {
        const {url} = req.body;
        const pageExists = allPages.find(page => page === url);
        if (pageExists) {
            res.status(401).json({message: "page already exists in sitemap", dta: pageExists});
        } else {
            allPages.push(url);
            await writeFile("../database/sitePages.js", `module.exports = ${allPages}`);
            await generateSitemap(allPages);
            res.status(200).json({message: `page: "${url}" added to sitemap successfully`, data: url});
        }
    } catch (err) {
        res.status(500).json({message: "error generating sitemap", error: err.message});
    }
};

/**
 * Deletes a single page from the sitemap.
 * @name deletePage
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @property {String} url - The URL of the page to delete.
 * @property {String} message - A human-readable message indicating the result of the request.
 * @property {String} data - The URL of the page deleted from the sitemap.
 * @return {Promise}
 */
exports.deletePage = async (req, res) => {
    try {
        const {url} = req.params;
        const pageExists = allPages.find(page => page === url);
        if (pageExists) {
            allPages.splice(allPages.indexOf(url), 1);
            await writeFile("../database/sitePages.js", `module.exports = ${allPages}`);
            await generateSitemap(allPages);
            res.status(200).json({message: `page: "${url}" deleted from sitemap successfully`, data: url});
        } else {
            res.status(404).json({message: "page does not exist in sitemap", dta: pageExists});
        }
    } catch (err) {
        res.status(500).json({message: "error deleting page from sitemap", error: err.message});
    }
};

/**
 * Updates a single page in the sitemap.
 * @name updatePage
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @property {String} url - The URL of the page to update.
 * @property {String} newUrl - The new URL of the page to update.
 * @property {String} message - A human-readable message indicating the result of the request.
 * @property {String} data - The URL of the page updated in the sitemap.
 * @return {Promise}
 */
exports.updatePage = async (req, res) => {
    try {
        const {url} = req.params;
        const {newUrl} = req.body;
        const pageExists = allPages.find(page => page === url);
        if (pageExists) {
            allPages.splice(allPages.indexOf(url), 1, [newUrl]);
            await writeFile("../database/sitePages.js", `module.exports = ${allPages}`);
            res.status(200).json({message: `page: "${url}" updated in sitemap successfully`, data: newUrl});
        } else {
            allPages.push(url);
            await writeFile("../database/sitePages.js", `module.exports = ${allPages}`);
            await generateSitemap(allPages);
            res.status(200).json({message: `page: "${newUrl}" added to sitemap successfully`, data: newUrl});
        }
    } catch (err) {
        res.status(500).json({message: "error updating page in sitemap", error: err.message});
    }
};
