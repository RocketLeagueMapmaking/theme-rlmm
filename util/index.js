// Package: string-similarity
// cdn: https://cdn.jsdelivr.net/npm/string-similarity@4.0.4/src/index.min.js

function compareTwoStrings(t, r) {
    if ((t = t.replace(/\s+/g, "")) === (r = r.replace(/\s+/g, ""))) return 1;
    if (t.length < 2 || r.length < 2) return 0;
    let e = new Map;
    for (let r = 0; r < t.length - 1; r++) {
        const n = t.substring(r, r + 2), s = e.has(n) ? e.get(n) + 1 : 1;
        e.set(n, s)
    }
    let n = 0;
    for (let t = 0; t < r.length - 1; t++) {
        const s = r.substring(t, t + 2), a = e.has(s) ? e.get(s) : 0;
        a > 0 && (e.set(s, a - 1), n++)
    }
    return 2 * n / (t.length + r.length - 2)
}

function findBestMatch(t, r) {
    if (!areArgsValid(t, r)) throw new Error("Bad arguments: First argument should be a string, second should be an array of strings");
    const e = [];
    let n = 0;
    for (let s = 0; s < r.length; s++) {
        const a = r[s], g = compareTwoStrings(t, a);
        e.push({ target: a, rating: g }), g > e[n].rating && (n = s)
    }
    return { ratings: e, bestMatch: e[n], bestMatchIndex: n }
}

function areArgsValid(t, r) {
    return "string" == typeof t && (!!Array.isArray(r) && (!!r.length && !r.find((function (t) { return "string" != typeof t }))))

}

module.exports = {
    compareTwoStrings,
    findBestMatch
};
