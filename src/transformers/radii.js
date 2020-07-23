var tokens = require('@adapt-design-system/tokens');
var makeScssVar = require('../util/scss');

function convertRadii() {
    var outputString = '\n// Border Radii\n';
    tokens.Radii.map((radius) => {
        outputString += `${makeScssVar(`border-radius-${radius.name}`, `${radius.value}${radius.unit}`)}\n`;
    });

    return outputString;
}

module.exports = convertRadii;
