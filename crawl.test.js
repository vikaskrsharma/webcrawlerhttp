const { normalizeUrl } = require('./crawl');
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
