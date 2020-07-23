var tokens = require('@adapt-design-system/tokens');
var cloneDeep = require('lodash/cloneDeep');
var makeScssVar = require('../util/scss');

/*
    Generate a JS object with a simpler structure than the tokens package:
    swatchName: `#${hex}` => primary: '#cc0000'

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

function generateExtendedObject(colorPalette) {
    var outputString = '';
    // Map over each 'category' of colors in the palette
    outputString += `\n// Extended Palette\n`;
    Object.keys(colorPalette).map((category) => {
        const label = category.toLowerCase();
        colorPalette[category].forEach(function (swatch) {
            outputString += `${makeScssVar(`extended-${label}-${swatch.codeName}`, `#${swatch.hex}`)}`;
        });
    });
    return outputString;
}

/*
    Iterates over the tokens and turns them into 
    a string containing all SCSS vars.
*/
function convertColors() {
    var colors = generateJsObject(tokens.ThemeColors);
    var outputString = `\n// Main Color Swatches\n`;

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

    outputString += generateExtendedObject(tokens.ColorPalette);
    // Now add newlines after each SCSS var
    outputString = outputString.split(';').join(';\n');
    return outputString;
}

module.exports = convertColors;
