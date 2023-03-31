//reading and writing into files
//synchronous way of reading files
const fs = require('fs');
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//contents in the file input.txt are read synchronously
console.log(textIn);
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');