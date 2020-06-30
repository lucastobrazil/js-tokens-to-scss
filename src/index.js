var fs = require('fs');
var tokens = require('@adapt-design-system/tokens');
var convertToScssVars = require('./transformers.js');

var sassVars = convertToScssVars(tokens.ThemeColors);

var comment = `/*
    CAUTION: DO NOT EDIT THIS FILE - It is automatically generated.
    ======================================================
    Design Tokens as SCSS. 
    Source: @adapt-design-system/tokens
*/`;

var outputData = `${comment}\n\n${sassVars}`;

fs.writeFile('./tokens.scss', outputData, function (err) {
    if (err) throw err;
    console.log('Tokens file created successfully.');
});
