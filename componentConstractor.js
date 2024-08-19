#!/usr/bin/env node
const fs = require('node:fs').promises;
const path = require('path');
const initFiles =  require('./initFiles.js');
const componentName = process.argv[2];
const envPath = path.join(__dirname, '.env');
let outputDir ;


if(!componentName){ 
    console.log('Usage:component <component_name>');
    return;
}

if(!componentName.includes('-')){
  console.log('\x1b[36m%s\x1b[0m', 'Component name must be kebab-case : <nav-bar>');
  return;
}
const componentTag = componentName.toLowerCase();
const componentClassName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
const htmlTemplatePath = path.join(__dirname, 'component-template.html');
const jsTemplatePath   = path.join(__dirname, 'component-template.js');
  
const parentDir = async () => {
  const envData = await fs.readFile(envPath, 'utf8');
  return envData.split("=")[1].trim();
};

(async () => {
  try {
    outputDir = await parentDir();
    console.log(outputDir);
    outputDir =  path.join(outputDir, 'frontend', 'src');
    fs.access(outputDir, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('\x1b[31m%s\x1b[0m', 'The frontend/src directory does not exist');
        return;
      }
    });
    const htmlTemplate = await fs.readFile(htmlTemplatePath, 'utf8');
    const processedHtmlTemplate = htmlTemplate.replace(/__COMPONENT_NAME__/g, componentClassName);
    await fs.writeFile(path.join(outputDir, 'templates', `${componentName}.html`), processedHtmlTemplate);
    const jsTemplate = await fs.readFile(jsTemplatePath, 'utf8');
    const processedJsTemplate = jsTemplate.replace(/__COMPONENT_NAME__/g, componentClassName.replace(/-/g, ''))
      .replace(/__COMPONENT_TAG__/g, componentTag);
    await fs.writeFile(path.join(outputDir, 'components', `${componentName}.js`), processedJsTemplate);
    console.log(`Component ${componentName} created successfully!`);
  } catch (err) {
    console.err(err);
  }
})();