function printReport(pages) {
    console.log("=======");
    console.log("REPORT");
    console.log("=======");

    const sortedPages = sortPages(pages);

    sortedPages.forEach((page) => {
        const url = page[0];
        const hits = page[1];
        console.log(`Found ${hits} links to page ${url}`);

    });

    console.log("=======");
    console.log("END REPORT");
    console.log("=======");

}

function sortPages(pages) {
    const pageArr = Object.entries(pages);
    pageArr.sort((a, b) => {
        const aHits = a[1];
        const bHits = b[1];

        return bHits - aHits;
    })
    return pageArr;
}

module.exports = {
    sortPages,
    printReport
}