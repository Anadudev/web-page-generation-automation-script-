const {sitemapHeader, sitemapFooter, sitemapLastModFormatter, sitemapStructure} = require("./stitemapStructure");
const {writeFile} = require("./fileCRUD");
const files = require("../config/files");

const generateSitemap = async (data) => {
    let sitemap = sitemapHeader();
    data.forEach((item) => {
        const date = sitemapLastModFormatter(new Date());
        sitemap += sitemapStructure(item, date, "weekly");
        console.log(item);
    });
    sitemap += sitemapFooter();
    await writeFile(files.sitemapFile, sitemap);
    return sitemap;
};

module.exports = generateSitemap;