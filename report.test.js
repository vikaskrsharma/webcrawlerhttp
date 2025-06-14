const { sortPages } = require('./report');
const { test, expect } = require('@jest/globals');

test('sortpages', () => {
    const input = { "https://wagslane.dev/path": 2, "https://wagslane.dev": 3 };
    const actual = sortPages(input);
    const expected = [
        ["https://wagslane.dev", 3],
        ["https://wagslane.dev/path", 2]
    ];
    expect(actual).toEqual(expected);
});