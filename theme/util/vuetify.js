const { readFileSync, writeFileSync } = require('fs')

// based on https://stackoverflow.com/a/74657867
function parseCSStxt (path) {
    const css = readFileSync(path, { encoding: 'utf8' });
    const notNil = (i) => !(typeof i === 'undefined' || i === null || i == '');
    /** @type {Array<{ selector: string, values: [string, string][]}>} */
    const output = [];

    for (const element of css.split('}')) {
        const rtmp = element.split('{');
        if (rtmp.length > 1 && Array.isArray(rtmp)) {
            let s = rtmp[0].split(","), v = rtmp[1].split(";");

            s = s.filter(notNil).map(i => i.split('\r\n').at(-1).trim());
            v = v.filter(notNil).map(i => i.split('\r\n').at(-1).trim());

            output.push({
                selector: s.at(-1),
                values: v
                    .filter(n => n.includes(':'))
                    .map(value => value.split(': '))
            });
        }
    }

    return output
}

module.exports = function syncVuetifyColors (cssPath, jsPath, selectors) {
    const css = parseCSStxt(cssPath);

    const getValues = (selector) => Object.keys(selectors.colors).reduce((prev, key) => {
        const getKey = (key, sel) => css.find(i => i.selector === sel).values.find(i => i[0] === selectors.colors[key])

        return {
            ...prev,
            [key]: (getKey(key, selector) ?? getKey(key, selectors.light))?.[1] ?? null,
        }
    }, {})

    writeFileSync(jsPath, 'module.exports = ' + JSON.stringify({ 
        dark: getValues(selectors.dark),
        light: getValues(selectors.light)
    }, null, 4), { encoding: 'utf-8' })
}