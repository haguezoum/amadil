#!/usr/bin/env node
const fs = require('node:fs');
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createFolder() {
  rl.question('Enter the folder name: ', (folderName) => {
    fs.mkdir(folderName, { recursive: true }, (err) => {
      if (err) throw err;
      console.log('Folder created successfully!');
      rl.close();
    });
  });
}

createFolder();

// module.exports = testNPM;