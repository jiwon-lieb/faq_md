module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");

    eleventyConfig.addPassthroughCopy("search.html");

    eleventyConfig.addPassthroughCopy("faq.json");

    return {
        dir: {
            input: '.',
            output: '_site'
        }
    }
}
