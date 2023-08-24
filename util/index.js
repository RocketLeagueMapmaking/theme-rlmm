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
    if (!areArgsValid(t, r)) {
        const errorText = "Bad arguments: First argument should be a string, second should be an array of strings"
        throw new Error(errorText);
    }
    const e = [];
    let n = 0;
    for (let s = 0; s < r.length; s++) {
        const a = r[s], g = compareTwoStrings(t, a);
        e.push({ target: a, rating: g }), g > e[n].rating && (n = s)
    }
    return { ratings: e, bestMatch: e[n], bestMatchIndex: n }
}

function areArgsValid(t, r) {
    const isString = (text) => typeof text === 'string'
    const isArray = !!Array.isArray(r) && !!r.length 
    return isString(t) && isArray && !r.find((t) => isString(t))
}

/**
 * Gets the boolean value from a string or boolean. Used for reading localStorage items
 * @param {string|boolean} value 
 * @returns {boolean}
 */
function getBooleanValue (value) {
    if (typeof value === 'boolean') return value
    if (typeof value === 'string') return value === 'true'
}

function isNotificationEnabled (notification, pages, $page, isDismissed) {
    const compareNeg = (prop, check) => (typeof prop === 'number' ? prop : (prop || { length: 0 }).length) > 0 ? check : true

    return compareNeg(notification.pages, pages.some(slug => $page.slug === slug))
        && compareNeg(notification.startDate, notification.startDate < Date.now())
        && compareNeg(notification.endDate, notification.endDate > Date.now())
        && (notification.once ? !isDismissed : true)
}

module.exports = {
    getBooleanValue,
    findBestMatch,
    isNotificationEnabled,
};
