#!/usr/bin/env node
// const fs = require('fs');
const fs = require('node:fs').promises;
const readline = require('node:readline');
// const path = require('node:path');
// if(!fsPromises)
// {
//   console.log('fs not found');
//   return;
// }else{
//   console.log('fs found');
// }

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

__init__();

async function createSubfolderStructur(parentFolder, router) {
  try {
    // await fs.mkdir("dldl");
    await fs.mkdir(parentFolder+"/backend");
    await fs.mkdir(`${parentFolder}/backend/${parentFolder}`);
    await fs.mkdir(`${parentFolder}/backend/apps`);
    await fs.mkdir(`${parentFolder}/backend/static`);
    await fs.mkdir(`${parentFolder}/backend/templates`);
    await fs.writeFile(`${parentFolder}/backend/manage.py`, "");
    await fs.writeFile(`${parentFolder}/backend/requirements.txt`, "");

    fs.mkdir(`${parentFolder}/frontend`);
    fs.mkdir(`${parentFolder}/frontend/public`);
    fs.writeFile(`${parentFolder}/frontend/public/index.html`, "");
    fs.mkdir(`${parentFolder}/frontend/src`);
    fs.mkdir(`${parentFolder}/frontend/src/assets`);
    fs.mkdir(`${parentFolder}/frontend/src/components`);
    fs.writeFile(`${parentFolder}/frontend/src/components/NavBar.js`, "");
    fs.mkdir(`${parentFolder}/frontend/src/templates`);
    fs.mkdir(`${parentFolder}/frontend/src/pages`);
    fs.mkdir(`${parentFolder}/frontend/src/services`);
    fs.writeFile(`${parentFolder}/frontend/src/App.js`, "");
    fs.writeFile(`${parentFolder}/frontend/src/index.js`, "");
      router ? fs.writeFile(`${parentFolder}/frontend/src/router.js`, ""):false;
  } catch (error) {
      console.log(error);
  }
}