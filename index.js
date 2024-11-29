#!/usr/bin/env node
const fs = require("node:fs").promises;
const readline = require("node:readline");
const { getRemoteFile } = require("./remoteGist.js");
const normalizeCssPath =
  "https://necolas.github.io/normalize.css/8.0.1/normalize.css";
const API_file =
  "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/e4ac9545a34432217e70ae4c95453b40ba796c5e/API.js";
const State_file =
  "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/3c8865be74080e16bbceee95fedc8d1b125aa84f/State.js";
const Router_file =
  "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/850ed28bcee8e630460ce11f851f5bdc6d76abcb/Router.js";
const routes_file =
  "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/d20a0c20752e9747c486bad8eb94968590205730/routes.js";
const Appjs_file =
  "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/6e216c881bd10e1b428839a9534b6ab44d0ffc68/App.js";
const htmlIndex_file =
  "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/941d7697a86192db6872a3ea4a37a34121a065bc/index.html";
const home_file =
  "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/850ed28bcee8e630460ce11f851f5bdc6d76abcb/home.js";
const routerLink_file =
  "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/850ed28bcee8e630460ce11f851f5bdc6d76abcb/router-link.js";
const about_file =
  "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/c043d99cd457b08e65d9bd9c37882637dfa7403e/about.js";
const about_file_css =
  "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/c043d99cd457b08e65d9bd9c37882637dfa7403e/about.css";
const home_file_css =
  "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/c043d99cd457b08e65d9bd9c37882637dfa7403e/home.css";
const routerLink_file_css =
  "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/c043d99cd457b08e65d9bd9c37882637dfa7403e/router-link.css";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve, reject) => {
    rl.question(`\x1b[36m${question}\x1b[0m`, (answer) => {
      if (validFolderName(answer)) {
        resolve(answer);
      } else {
        reject(new Error("Invalid input !"));
      }
    });
  });
}

async function createFolder(folderName) {
  try {
    await fs.access(folderName, fs.constants.F_OK);
    console.log(`Folder \x1b[31m${folderName}\x1b[0m already exists.`);
  } catch (err) {
    try {
      await fs.mkdir(folderName, { recursive: true });
      createSubfolderStructur(folderName);
      console.log("✅ Folder created successfully!");
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
}

async function __init__() {
  try {
    const folderName = await askQuestion("Enter the folder name: ");
    createFolder(folderName);
    rl.close();
  } catch (error) {
    console.clear();
    console.error(error.message);
    __init__();
  }
}

function validFolderName(folderName) {
  if (/^[^0-9][a-zA-Z]{1,}$/.test(folderName)) return true;
  else return false;
}

async function createSubfolderStructur(parentFolder) {
  try {
    await fs.mkdir(`${parentFolder}/frontend`);
    await fs.mkdir(`${parentFolder}/frontend/public`);
    getRemoteFile(htmlIndex_file, `${parentFolder}/frontend/public/index.html`);
    await fs.mkdir(`${parentFolder}/frontend/src`);
    await fs.mkdir(`${parentFolder}/frontend/src/assets`);
    await fs.mkdir(`${parentFolder}/frontend/src/assets/style`);
    await fs.writeFile(
      `${parentFolder}/frontend/src/assets/style/normalize.css`,
      await fetch(normalizeCssPath)
        .then((data) => {
          return data.text();
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return "/*Error during the fetch normilze.css from https://necolas.github.io/normalize.css/*/";
        })
    );
    await fs.mkdir(`${parentFolder}/frontend/src/assets/media`);
    await fs.mkdir(`${parentFolder}/frontend/src/components`);
    getRemoteFile(
      routerLink_file,
      `${parentFolder}/frontend/src/components/router-link.js`
    );
    await fs.mkdir(`${parentFolder}/frontend/src/pages`);
    getRemoteFile(home_file, `${parentFolder}/frontend/src/pages/home.js`);
    getRemoteFile(about_file, `${parentFolder}/frontend/src/pages/about.js`);
    getRemoteFile(
      about_file_css,
      `${parentFolder}/frontend/src/assets/style/about-page.css`
    );
    getRemoteFile(
      home_file_css,
      `${parentFolder}/frontend/src/assets/style/home-page.css`
    );
    getRemoteFile(
      routerLink_file_css,
      `${parentFolder}/frontend/src/assets/style/router-link.css`
    );
    await fs.mkdir(`${parentFolder}/frontend/src/services`);
    getRemoteFile(API_file, `${parentFolder}/frontend/src/services/API.js`);
    getRemoteFile(State_file, `${parentFolder}/frontend/src/services/State.js`);
    getRemoteFile(
      Router_file,
      `${parentFolder}/frontend/src/services/Router.js`
    );
    getRemoteFile(
      routes_file,
      `${parentFolder}/frontend/src/services/routes.js`
    );
    getRemoteFile(Appjs_file, `${parentFolder}/frontend/src/App.js`);
    await fs.writeFile(
      `${parentFolder}/frontend/src/index.js`,
      `import "./components/router-link.js";`
    );
    await fs.writeFile(
      `${parentFolder}/frontend/src/App.css`,
      `
/* Add your global styles here */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}`
    );
    await fs.writeFile(
      `${parentFolder}/.config.dev.json`,
      `
{
  "projectName": "${parentFolder}",
  "version": "1.0.0",
  "paths": {
    "project": "${process.cwd()}/${parentFolder}",
    "basename": "${parentFolder}"
  }
}
    `
    );
    getRemoteFile(
      "https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/d20a0c20752e9747c486bad8eb94968590205730/runner.sh",
      `${parentFolder}/runner.sh`
    );
    // run the runner script
    // fs.chmod(`${parentFolder}/runner.sh`, 0o755);
  } catch (error) {
    console.log("hers " + error.message);
    return;
  }
}

__init__();
