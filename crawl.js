const { JSDOM } = require('jsdom')

async function crawlPage(baseUrl, currentUrl, pages) {

    const baseUrlObj = new URL(baseUrl);
    const currentUrlObj = new URL(currentUrl);
    if (baseUrlObj.hostname !== currentUrlObj.hostname) {
        return pages;
    }

    const normalizedCurrentUrl = normalizeUrl(currentUrl);
    if (pages[normalizedCurrentUrl] > 0) {
        pages[normalizedCurrentUrl]++;
        return pages;
    }

    pages[normalizedCurrentUrl] = 1;
    console.log(`currently crawling ${currentUrl}`);

    try {
        const resp = await fetch(currentUrl);

        if (resp.status > 399) {
            console.log(`error in fetch with status code ${resp.status} for current Url: ${currentUrl}`);
            return pages;
        }

        const contentType = resp.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            console.log(`non html response, content type: ${contentType} for current Url: ${currentUrl}`);
            return pages;
        }

        const htmlBody = await resp.text();

        const nextUrls = getUrlsFromHtml(htmlBody, baseUrl);
        nextUrls.forEach(async (nextUrl) => {
            pages = await crawlPage(baseUrl, nextUrl, pages);
        });

    } catch (error) {
        console.log(`error in fetch when fetching url: ${currentUrl}`);

    }

    return pages;
}
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
    getUrlsFromHtml,
    crawlPage
}