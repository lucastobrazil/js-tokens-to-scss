function makeScssVar(name, value) {
    return `$${name}: #${value};`;
}

/*
    Iterates over the tokens and turns them into 
    a string containing all SCSS vars.
*/
function convertToScssVars(themeColors) {
    var outputString = `// Main Color Swatches\n`;
    Object.keys(themeColors).map((swatchName) => {
        // We encountered the `modes` object that requires an extra level of nesting
        return swatchName === 'modes'
            ? Object.keys(themeColors.modes).map((mode) => {
                outputString += `// ${mode} mode swatches\n`;
                  Object.keys(themeColors.modes[mode]).map((subSwatch) => {
                      outputString += `${makeScssVar(`${mode}-mode-${subSwatch}`,themeColors.modes[mode][subSwatch].hex)}`;
                  });
              })
            : (outputString += `${makeScssVar(swatchName, themeColors[swatchName].hex)}`);
    });

    // Now add newlines after each SCSS var
    outputString = outputString.split(';').join(';\n');
    return outputString;
}

module.exports = convertToScssVars;
