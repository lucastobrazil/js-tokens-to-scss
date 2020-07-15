var PREFIX = 'ads-';
/*
    Takes swatch name and value, turns into:
    name: value
*/
function makeScssVar(name, value) {
    var name = _makeScssName(name);
    return `${name}: ${value};`;
}

/*
    Takes swatch name and turns it into: $ads-foo
*/
function _makeScssName(swatch) {
    return `$${PREFIX}${swatch}`;
}

module.exports = makeScssVar;
