#!/usr/bin/env node
const fs = require('node:fs').promises;
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
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

/*
  after creating the folder structure, we need to create the templates of html and js files
  its hard to access to the package that installed globaly in the machine to create component struct or templates struct
  so we need to create templates in the base folder and copy them to the new folder
  then we easily access to them and copy them to the new folder 
  then remove the temporary folder
*/
async function creatTemplates(templateType, folderName)
{
  try {
    await fs.mkdir(folderName, { recursive: true });
    await fs.writeFile(`${e}index.html`, "");
  } catch (error) {
    console.error(error.message);
  }
  
}

async function createFolder(folderName, createRouterFile)
{
  try {
    await fs.access(folderName, fs.constants.F_OK);
    console.log(`Folder \x1b[31m${folderName}\x1b[0m already exists.`);
  } catch (err) {
      try{
        await fs.mkdir(folderName, { recursive: true });
        createSubfolderStructur(folderName, createRouterFile);
        console.log('Folder created successfully!');
      }
      catch(error)
      {
        console.error(error.message);
      }
  }
}

async function __init__() {
  try
  {
    const folderName        = await askQuestion("Enter the folder name: ");
    const createRouterFile  = await askQuestion("Do you want to start the Router file ? (yes / no) : ");
    createFolder(folderName,createRouterFile.toLowerCase());
    rl.close();
  } 
  catch (error)
  {
    console.clear();
    console.error(error.message);
    __init__();
  }
}

function validFolderName(folderName)
{
  if (/^[^0-9][a-zA-Z]{1,}$/.test(folderName))
    return true;
  else
    return false;
}

async function createSubfolderStructur(parentFolder, router) {
  try {
    await fs.mkdir(parentFolder+"/backend");
    await fs.mkdir(`${parentFolder}/backend/${parentFolder}`);
    await fs.mkdir(`${parentFolder}/backend/apps`);
    await fs.mkdir(`${parentFolder}/backend/static`);
    await fs.mkdir(`${parentFolder}/backend/templates`);
    await fs.writeFile(`${parentFolder}/backend/manage.py`, "");
    await fs.writeFile(`${parentFolder}/backend/requirements.txt`, "");

    await fs.mkdir(`${parentFolder}/frontend`);
    await fs.mkdir(`${parentFolder}/frontend/public`);
    await fs.writeFile(`${parentFolder}/frontend/public/index.html`, "");
    await fs.mkdir(`${parentFolder}/frontend/src`);
    await fs.mkdir(`${parentFolder}/frontend/src/assets`);
    await fs.mkdir(`${parentFolder}/frontend/src/components`);
    await fs.writeFile(`${parentFolder}/frontend/src/components/NavBar.js`, "");
    await fs.mkdir(`${parentFolder}/frontend/src/templates`);
    await fs.mkdir(`${parentFolder}/frontend/src/pages`);
    await fs.mkdir(`${parentFolder}/frontend/src/services`);
    await fs.writeFile(`${parentFolder}/frontend/src/App.js`, "");
    await fs.writeFile(`${parentFolder}/frontend/src/index.js`, "");
      router ? fs.writeFile(`${parentFolder}/frontend/src/router.js`, ""):false;
  } catch (error) {
      console.log(error);
  }
}

__init__();