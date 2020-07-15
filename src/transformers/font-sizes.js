var tokens = require('@adapt-design-system/tokens');
var makeScssVar = require('../util/scss');

function convertLineHeights() {
    var fontSizes = tokens.FontSizes;
    var outputString = '\n// Line Heights\n';
    fontSizes.map((level) => {
        outputString += `${makeScssVar(`line-height-${level.name}`, level.lineHeight)}\n`;
    });
    return outputString;
}

function convertFontSizes() {
    var fontSizes = tokens.FontSizes;
    var outputString = '\n// Font Sizes\n';
    fontSizes.map((level) => {
        outputString += `${makeScssVar(`font-size-${level.name}`, `${level.value}${level.unit}`)}\n`;
    });

    // Also add line heights
    outputString += convertLineHeights();
    return outputString;
}

module.exports = convertFontSizes;
