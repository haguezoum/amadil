#!/usr/bin/env node
const fs = require('node:fs');
const path = require('path');

const componentName = process.argv[2];
 if(!componentName)
{ 
  console.log('Usage:component <component_name>');
  return;
}

  const componentTag = componentName.toLowerCase();
  const componentClassName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  const templateDir = path.join(process.cwd(), 'templates');
  const outputDir = path.join(process.cwd(), componentName);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
return;
  // Read and process HTML template
  const htmlTemplate = fs.readFileSync(path.join(templateDir, 'component-template.html'), 'utf8')
    .replace(/__COMPONENT_NAME__/g, componentClassName);

  fs.writeFileSync(path.join(outputDir, `${componentName}.html`), htmlTemplate);

  // Read and process JS template
  const jsTemplate = fs.readFileSync(path.join(templateDir, 'component-template.js'), 'utf8')
    .replace(/__COMPONENT_NAME__/g, componentClassName)
    .replace(/__COMPONENT_TAG__/g, componentTag);

  fs.writeFileSync(path.join(outputDir, `${componentName}.js`), jsTemplate);

  console.log(`Component ${componentName} created successfully!`);
