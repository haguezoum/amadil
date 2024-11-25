#!/usr/bin/env node
const fs = require("node:fs").promises;
const path = require("path");
const { getConfig } = require("./finder.js");
const componentName = process.argv[2];
let outputDir;

if (!componentName) {
  console.log("Usage:component <component_name>");
  return;
}

if (!componentName.includes("-")) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "Component name must be kebab-case : <nav-bar>"
  );
  return;
}
const componentTag = componentName.toLowerCase();
const componentClassName =
  componentName.charAt(0).toUpperCase() + componentName.slice(1);
const jsTemplatePath = path.join(__dirname, "component-template.js");

(async () => {
  try {
    outputDir = await getConfig().paths.project;
    outputDir = path.join(outputDir, "frontend", "src");
    fs.access(outputDir, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(
          "\x1b[31m%s\x1b[0m",
          "The frontend/src directory does not exist"
        );
        return;
      }
    });
    await fs.writeFile(
      path.join(outputDir, "assets/style", `${componentName}.css`),
      `/****** ${componentName}.css ******/`
    );
    const jsTemplate = await fs.readFile(jsTemplatePath, "utf8");
    const processedJsTemplate = jsTemplate
      .replace(/__COMPONENT_NAME__/g, componentClassName.replace(/-/g, ""))
      .replace(/__COMPONENT_TAG__/g, componentTag);
    await fs.writeFile(
      path.join(outputDir, "components", `${componentName}.js`),
      processedJsTemplate
    );
    console.log(`Component ${componentName} created successfully!`);
  } catch (err) {
    console.err(err);
  }
})();
