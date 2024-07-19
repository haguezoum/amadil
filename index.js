#!/usr/bin/env node
const fs = require('node:fs');
const readline = require('node:readline');
const createRouterFile = require('./Router.js');
let router = false;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function askQuestion(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      if (validInput(answer)) {
        resolve(answer);
      } else {
        reject(new Error("Invalid input"));
      }
    });
  });
}

function createFolder(folderName, createRouterFile)
{
  if(fs.access(folderName, fs.constants.F_OK, (err) => 
  {
    if (err === 'EEXIST') 
    {
      console.log('X : '+ err);
      createFolder();
    } 
    fs.mkdir(folderName, { recursive: true }, (err) => {
      if (err){
        console.error(err.message);
      }
      else
      {
        createSubfolderStructur(folderName, createRouterFile);
      }
      console.log('Folder created successfully!');
      
      
    });
  }));

}

async function __init__() {
  try
  {
    const validAnwsers = ["yes", "y", "no", "n", "la", "oho", "nn", "ok"];

    const folderName = await askQuestion("Enter the folder name: ");
    let createRouterFile = await askQuestion("Do you want to start the Router file ? (yes / no) : ");
    if(!validAnwsers.includes(createRouterFile.toLowerCase()))
    {
      console.error("only Yes(y) or No(n) !");
      createRouterFile = await askQuestion("Do you want to start the Router file ? (yes / no) : ");
    }
    else
      createFolder(folderName,true);
    rl.close();
  } 
  catch (error)
  {
    console.error(error)
  }
}

function validInput(folderName)
{
  if (/^[^0-9][a-zA-Z]{1,}$/.test(folderName))
    return true;
  else
    return false;
}


__init__();

function createSubfolderStructur(parentFolder,router ) {
  try {
    fs.mkdirSync(parentFolder+"/backend");
    fs.mkdirSync(parentFolder+"/backend/"+parentFolder);
    fs.mkdirSync(parentFolder+"/backend/"+"apps");
    fs.mkdirSync(parentFolder+"/backend/"+"static");
    fs.mkdirSync(parentFolder+"/backend/"+"templates");
    fs.writeFileSync(parentFolder+"/backend/manage.py", "");
    fs.writeFileSync(parentFolder+"/backend/requirements.txt", "");

    fs.mkdirSync(parentFolder+"/frontend");
    fs.mkdirSync(parentFolder+"/frontend/public");
    fs.writeFileSync(parentFolder+"/frontend/public/index.html", "");
    fs.mkdirSync(parentFolder+"/frontend/src");
    fs.mkdirSync(parentFolder+"/frontend/src/assets");
    fs.mkdirSync(parentFolder+"/frontend/src/components");
    fs.writeFileSync(parentFolder+"/frontend/src/components/NavBar.js", "");
    fs.mkdirSync(parentFolder+"/frontend/src/pages");
    fs.mkdirSync(parentFolder+"/frontend/src/services");
    fs.writeFileSync(parentFolder+"/frontend/src/App.js", "");
    fs.writeFileSync(parentFolder+"/frontend/src/index.js", "");
      if(router)
        fs.writeFileSync(parentFolder+"/frontend/src/router.js", "");
  } catch (error) {
      console.log(error);
  }
}
// module.exports = testNPM;