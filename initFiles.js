#!/usr/bin/env node
const fs = require('node:fs');
const path = require('path');


function initFiles(componentName, componentTag)
{
    const indexFilePath = path.join(process.cwd(), 'frontend/public', 'index.html');


    fs.appendFile(indexFilePath, 
    `<DOCTYPE html>
    <html>
        <head>
            <script type="module" src="../src/components/${componentName}.js"></script>
        </head>
        <body>
            <${componentTag}></${componentTag}>
        </body>
    </html>`,
    (err) => {
        if (err) throw err;
});
}

module.exports = initFiles;