const { normalizeUrl, getUrlsFromHtml } = require('./crawl');
const { test, expect } = require('@jest/globals');

test('normalizeUrl strip protocol', () => {
    const input = 'https://boot.dev/path';
    const actual = normalizeUrl(input);
    const expected = 'boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeUrl strip trailing slash', () => {
    const input = 'https://boot.dev/path/';
    const actual = normalizeUrl(input);
    const expected = 'boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeUrl capitals', () => {
    const input = 'https://boot.dev';
    const actual = normalizeUrl(input);
    const expected = 'boot.dev';
    expect(actual).toEqual(expected);
});

test('getUrlsFromHtml absolute urls', () => {
    const inputHtmlBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path/">Boot Blog</a>
            </body>
        </html>
     `;
    const inputBaseUrl = "https://blog.boot.dev";
    const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test('getUrlsFromHtml relative urls', () => {
    const inputHtmlBody = `
        <html>
            <body>
                <a href="/path/">Boot Blog</a>
            </body>
        </html>
     `;
    const inputBaseUrl = "https://blog.boot.dev";
    const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test('getUrlsFromHtml both types', () => {
    const inputHtmlBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path1/">Boot Blog</a>
                <a href="/path2/">Boot Blog</a>
            </body>
        </html>
     `;
    const inputBaseUrl = "https://blog.boot.dev";
    const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected);
});

test('invalid url', () => {
    const inputHtmlBody = `
        <html>
            <body>
                <a href="invalid">Boot Blog</a>
            </body>
        </html>
     `;
    const inputBaseUrl = "https://blog.boot.dev";
    const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl);
    const expected = [];
    expect(actual).toEqual(expected);
});
