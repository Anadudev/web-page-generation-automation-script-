
exports.sitemapLastModFormatter = (date) => date.toISOString().split("T")[0];

exports.sitemapHeader = () => `<?xml version="1.0" encoding="UTF-8"?>
        <!--	created with www.contigocf.com	-->
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        `;

exports.sitemapStructure = (link, date, frequency = "daily", priority = "1.0") => `
<url>
   <loc>${link}</loc>
   <lastmod>2024-08-21</lastmod>
   <changefreq>${frequency}</changefreq>
   <priority>${priority}</priority>
</url>
`;

exports.sitemapFooter = () => `</urlset>`;