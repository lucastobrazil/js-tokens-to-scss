var cloneDeep = require('lodash/cloneDeep');
var PREFIX = 'ads-';
var dictionary = require('./dictionary.js');

/*
    First, we generate a JS object with a simpler sturcture:
    swatchName: `#${hex}`;
    primary: '#cc0000';

    This way, any other mapping we need to do can simply 
    take `key: value` without needing to pull out 
    hex values etc. from the tokens.
*/
function generateJsObject(themeColors) {
    var obj = cloneDeep(themeColors);

    Object.keys(themeColors).map((swatchName) => {
        // We encountered the `modes` object that requires an extra level of nesting
        return swatchName === 'modes'
            ? Object.keys(themeColors.modes).map((mode) => {
                  Object.keys(themeColors.modes[mode]).map((subSwatchName) => {
                      obj.modes[mode][subSwatchName] = `#${themeColors.modes[mode][subSwatchName].hex}`;
                  });
              })
            : (obj[swatchName] = `#${themeColors[swatchName].hex}`);
    });
    return obj;
}

/*
    Takes swatch name and value, turns into:
    name: value
*/
function makeScssVar(name, value) {
    var name = makeScssName(name);
    return `${name}: ${value};`;
}

/*
    Takes swatch name and turns it into: $ads-foo
*/
function makeScssName(swatch) {
    return `$${PREFIX}${swatch}`;
}

/*
    Reads over the dictionary mapping of Mendix vars to
    ADS themeColor token names, then returns a string
    in the format:
    
    $ads-mendix-var-name: $ads-theme-color-name;
    
    For example:
    $ads-brand-primary: $ads-primary;
*/
function generateMendixVars() {
    var str = `\n/*
    Mendix Var Names.
    These should be set up in the mendix project.
*/\n`;
    Object.keys(dictionary).map((mendixVar) => {
        var mappedName = dictionary[mendixVar];

        str += makeScssVar(mendixVar, makeScssName(mappedName));
    });
    return str;
}

/*
    Iterates over the tokens and turns them into 
    a string containing all SCSS vars.
*/
function convertToScssVars(themeColors) {
    var colors = generateJsObject(themeColors);
    var outputString = `// Main Color Swatches\n`;

    // Generate basic $ads-var: #hex for all themeColors
    Object.keys(colors).map((swatchName) => {
        // We encountered the `modes` object that requires an extra level of nesting
        return swatchName === 'modes'
            ? Object.keys(colors.modes).map((mode) => {
                  outputString += `// ${mode} mode swatches\n`;
                  Object.keys(colors.modes[mode]).map((subSwatchName) => {
                      outputString += `${makeScssVar(
                          `${mode}-mode-${subSwatchName}`,
                          colors.modes[mode][subSwatchName]
                      )}`;
                  });
              })
            : (outputString += `${makeScssVar(swatchName, colors[swatchName])}`);
    });
    
    // Generate vars that map mendix var to ADS token var
    outputString += generateMendixVars();
    
    // Now add newlines after each SCSS var
    outputString = outputString.split(';').join(';\n');
    return outputString;
}

module.exports = convertToScssVars;
