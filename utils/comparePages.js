let {default: stringComparison} = require("string-comparison");
const TfIdf = require("node-tfidf");

const cosineSim = (a, b) => {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return magA && magB ? dot / (magA * magB) : 0;
};

exports.comparisonCleanUp = (page) => page.replace(/\s+/g, " ");

exports.comparePages = (paragraph1, paragraph2) => {
    const tfidf = new TfIdf();

    // Add documents (paragraphs)
    tfidf.addDocument(paragraph1);
    tfidf.addDocument(paragraph2);

    // Extract terms for each paragraph
    const terms1 = tfidf.listTerms(0);
    const terms2 = tfidf.listTerms(1);

    // Build unique vocabulary
    const vocab = new Set([...terms1.map(t => t.term), ...terms2.map(t => t.term)]);

    // Convert to vectors
    const vec1 = [];
    const vec2 = [];

    vocab.forEach(term => {
        vec1.push(tfidf.tfidf(term, 0));
        vec2.push(tfidf.tfidf(term, 1));
    });

    return cosineSim(vec1, vec2);
};

exports.findSimilarPage = (pages, comparePage, similarityThreshold) => {
    let similarity = 0;
    let similarPage = null;

    for (const page of pages) {
        similarity = this.comparePages(page.pageContext, comparePage);
        if (similarity > similarityThreshold) {
            similarPage = page;
            return {similarity, similarPage};
        }
    }
    return {similarity, similarPage};
};
