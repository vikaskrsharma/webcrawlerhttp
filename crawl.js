const { JSDOM } = require('jsdom')
function getUrlsFromHtml(htmlBody, baseUrl) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    linkElements.forEach((linkElement) => {
        const linkUrl = linkElement.href;
        if (linkUrl.slice(0, 1) === '/') {
            // relative url
            try {
                const urlObj = new URL(`${baseUrl}${linkUrl}`);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(error.message);
            }

        } else {
            // absolute url
            try {
                const urlObj = new URL(linkUrl);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(error.message);
            }
        }

    });

    return urls;
}

function normalizeUrl(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.endsWith('/')) {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeUrl,
    getUrlsFromHtml
}