const express = require("express");
const {
    getAllPages,
    getSinglePage,
    generateSitemap,
    deletePage,
    updatePage
} = require("../controllers/generateSitemapController");
const router = express.Router();

router.get("/sitemaps", getAllPages);
router.get("/sitemaps/:url", getSinglePage);
router.post("/sitemaps", generateSitemap);
router.delete("/sitemaps/:url", deletePage);
router.put("/sitemaps/:url", updatePage);

module.exports = router;
