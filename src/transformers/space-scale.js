var tokens = require('@adapt-design-system/tokens');
var makeScssVar = require('../util/scss');

function convertSpaceScale() {
    var outputString = '\n// Space Scale\n';
    outputString += `${makeScssVar(`spacing`, `${tokens.SpaceScale.value}px`)}\n`;
    return outputString;
}

module.exports = convertSpaceScale;
