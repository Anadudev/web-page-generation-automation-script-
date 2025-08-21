const {writeFile, readFile} = require("./fileCRUD");
const missingGA = require("../database/missingGA.json") || [];
const sitePages = require("../database/sitePages.js");
const GAScript = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-J29XZTR60C"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag("js", new Date());

  gtag("config", "G-J29XZTR60C");
</script>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
    <style>
        .wf-force-outline-none[tabindex="-1"]:focus {
            outline: none;
        }
    </style>`;

const addGoogleAnalytics = async (page, pagePath) => {
//     add Google Analytics within the page head tag before the title tag using regex
    const headTagRegex = /<head>(.*?)<\/head>/gis;
    const newPage = page.replace(headTagRegex, `<head>$1${GAScript}</head>`);
    await writeFile(pagePath, newPage);
    return newPage;
};

const findPageWithoutGoogleAnalytics = async () => {
    const promises = sitePages.map((pagePath) =>
        readFile(pagePath).then((page) => {
            const hasGoogleAnalytics = page.includes("<!-- Google tag (gtag.js) -->");
            if (!hasGoogleAnalytics) {
                // await addGoogleAnalytics(page, pagePath);
                missingGA.push(pagePath);
                // console.log(pagePath);
            }
        })
    );

    await Promise.all(promises);
    await writeFile("../database/missingGA.json", JSON.stringify(missingGA, null, 2));
};

findPageWithoutGoogleAnalytics();

module.exports = findPageWithoutGoogleAnalytics;
