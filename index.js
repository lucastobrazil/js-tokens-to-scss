// include node fs module
var fs = require('fs');
var tokens = require('@adapt-design-system/tokens');
console.log(tokens);

var colors = {
    primary: '#cc0000',
    secondary: '#fdfdfd',
};

var string = '// Design Tokens as SCSS\n';

for (const [key, value] of Object.entries(colors)) {
    string = `${string}$${key}: ${value};\n`;
}
// writeFile function with filename, content and callback function
fs.writeFile('tokens.scss', string, function (err) {
    if (err) throw err;
    console.log('Tokens file created successfully.');
});
