#!/usr/bin/env node
const fs = require('node:fs');
const path = require('path');
const initFiles =  require('./initFiles.js');

const componentName = process.argv[2];
 if(!componentName)
  { 
    console.log('Usage:component <component_name>');
    return;
  }

  if(!componentName.includes('-'))
  {
    console.log('\x1b[36m%s\x1b[0m', 'Component name must be kebab-case');
    console.log('Example: my-component');
    return;
  }

  console.log(process.cwd());
  console.log(path.relative(__dirname, process.cwd()));
  // get the name of the parent folder
 const parentFolder = path.basename(path.resolve('..'));
 console.log(parentFolder);
 
  return;
  const componentTag = componentName.toLowerCase();
  const componentClassName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  const htmlTemplatePath = path.join(__dirname, 'component-template.html');
  const jsTemplatePath   = path.join(__dirname, 'component-template.js');
  const outputDir = path.resolve("..", "frontend", "src"); // should be the path to the frontend/src folder

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  // Read and process HTML template
  const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf8')
    .replace(/__COMPONENT_NAME__/g, componentClassName);

  fs.writeFileSync(path.join(__dirname,'frontend' ,'src' , 'templates',`${componentName}.html`),
    htmlTemplate);

  // Read and process JS template
  const jsTemplate = fs.readFileSync(jsTemplatePath, 'utf8')
  .replace(/__COMPONENT_NAME__/g, componentClassName.replace(/-/g, ''))
  .replace(/__COMPONENT_TAG__/g, componentTag);

  fs.writeFileSync(path.join(outputDir, 'components',`${componentName}.js`),
  jsTemplate);

  console.log(`Component ${componentName} created successfully!`);
 
  /*
    [-] Resolved the path to the frontend/src folder
    [-] Read the HTML and JS templates
    [-] Replaced placeholders in the templates with the component name and tag
    [-] Wrote the processed templates to the frontend/src/templates and frontend/src/components directories
    [-] Printed a success message to the console
  */