const { crawlPage } = require("./crawl");

async function main() {
    console.log(process.argv);
    if (process.argv.length < 3) {
        console.log("no website provided");
        process.exit(1);
    }

    if (process.argv.length > 3) {
        console.log("too many command line arguments");
        process.exit(1);
    }

    const websiteToCrawl = process.argv[2];
    const pages = await crawlPage(websiteToCrawl, websiteToCrawl, {});
    for (const page of Object.entries(pages)) {
        console.log(page);
    }
}

main()