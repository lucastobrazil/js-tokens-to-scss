var tokens = require('@adapt-design-system/tokens');
var makeScssVar = require('../util/scss');
/*

default = [{
  name: 'uber',
  value: 111,
  unit: 'px',
  lineHeight: 1.08
},

*/

function convertFontSizes() {
    var fontSizes = tokens.FontSizes;
    var outputString = '\n// Font Sizes\n';
    fontSizes.map(level => {
        outputString += `${makeScssVar(`font-size-${level.name}`, `${level.value}${level.unit}`)}\n`;
    })
    return outputString;
}

module.exports = convertFontSizes;
