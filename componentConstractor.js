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

    const componentTag = componentName.toLowerCase();
    const componentClassName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    const htmlTemplatePath = path.join(__dirname, 'component-template.html');
    const jsTemplatePath   = path.join(__dirname, 'component-template.js');
    const outputDir = path.join(process.cwd(), 'frontend', 'src');

    initFiles(componentName, componentTag);
    console.log(`htmlTemplatePath: ${htmlTemplatePath}`);
    console.log(`jsTemplatePath: ${jsTemplatePath}`);
    console.log(`outputDir: ${outputDir}`);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    // Read and process HTML template
    const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf8')
      .replace(/__COMPONENT_NAME__/g, componentClassName);

      console.log(path.join(outputDir, 'templates',`${componentName}.html`));
    
    fs.writeFileSync(path.join(outputDir, 'templates',`${componentName}.html`), htmlTemplate);
    // console.log(`Component ${componentName} created successfully!`);

  // Read and process JS template
  const jsTemplate = fs.readFileSync(jsTemplatePath, 'utf8')
    .replace(/__COMPONENT_NAME__/g, componentClassName.replace(/-/g, ''))
    .replace(/__COMPONENT_TAG__/g, componentTag);

  fs.writeFileSync(path.join(outputDir, 'components', `${componentName}.js`), jsTemplate);

  console.log(`Component ${componentName} created successfully!`);
