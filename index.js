#!/usr/bin/env node
const { Console } = require('node:console');
const fs = require('node:fs');
const readline = require('node:readline');
const createRouterFile = require('./Router.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let router = false;

function createFolder() {
  rl.question('Enter the folder name: ', (folderName) => {
    if(fs.access(folderName, fs.constants.F_OK, (err) => 
    {
      if (err === 'EEXIST') 
      {
        console.log('X : '+ err);
        createFolder();
      } 
      // else 
      // {
        fs.mkdir(folderName, { recursive: true }, (err) => {
          if (err) throw err;
          {
            createSubfolderStructur(folderName);
          }
          console.log('Folder created successfully!');
          
          rl.question('Do you want to create a router file? (yes/no): ', (answer) => {
            if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
              router = true;
              createRouterFile(folderName);
              rl.close();
            } else {
              rl.close();
            }
          });
        });
      // }
    }));
  }); 

  
  
}

createFolder();

function createSubfolderStructur(parentFolder) {
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
    fs.writeFileSync(parentFolder+"/frontend/src/services/App.js", "");
    fs.writeFileSync(parentFolder+"/frontend/src/services/index.js", "");
    fs.writeFileSync(parentFolder+"/frontend/src/services/router.js", "");
  } catch (error) {
      console.log(error);
  }
}
// module.exports = testNPM;