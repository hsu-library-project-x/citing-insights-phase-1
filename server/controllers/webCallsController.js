const fetch = require('node-fetch');

function checkAuthor(author) {
    var author_name = "";
    if (author.length > 0 && "given" in author[0] && "family" in author[0]) {
        author_name = author[0]["family"] + "+" + author[0]["given"];
    }
    return author_name;
}

function checkTitle(title) {
    var title_name = "";
    if (title.length > 0) {
        title_name = title[0];
    }
    return title;
}

async function crossRef(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function s2(data) {
    let doi = data.message.items[0].DOI;
    const response = await fetch("http://api.semanticscholar.org/v1/paper/" + doi);
    const metaData = await response.json();
    return metaData;
}

module.exports = {
    checkAuthor,
    checkTitle,
    getData: async (url) => {
        let data = await crossRef(url)
        let metaData = await s2(data)
        return metaData.doi;
    }
}
