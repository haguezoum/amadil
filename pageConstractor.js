#!/usr/bin/env node

const fs = require('node:fs').promises;
const path = require('node:path');
const {getConfig} = require("./finedr.js");
const { stdout } = require('node:process');

const   projectPath = getConfig().paths.project;
let     pageName = process.argv[2] ? process.argv[2].trim().toUpperCase() : (console.error("Usage: page <page-name>"), process.exit(1));
const   pagePath = path.join(projectPath, 'frontend/src/pages');
const   jsTemplatePath = path.join(__dirname, 'component-template.js');

(async ()=>{
    try {
        try {
            await fs.access(pagePath);
        } catch {
            await fs.mkdir(pagePath, { recursive: true });
        }
        await fs.writeFile(path.join(projectPath, 'frontend/src/assets/style/', `${pageName.toLowerCase()}-page.css`), `/****** ${pageName}.css ******/`);
        const jsTemplate = await fs.readFile(jsTemplatePath, 'utf8');
        const processedJsTemplate = jsTemplate.replace(/__COMPONENT_NAME__/g, pageName).replace(/__COMPONENT_TAG__/g, `${pageName.toLowerCase()}-page`);
        await fs.writeFile(`${pagePath}/${pageName.toLowerCase()}.js`, processedJsTemplate);
        console.info(`Page ${pageName} created successfully!`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})()