#!/bin/sh

# This script is used to run the temporary server.
curl -o server.js 'https://gist.githubusercontent.com/haguezoum/2829f8d9058304a1843643357cacc094/raw/20f7b1e03672a9d96cdfb124158161a90741006c/server.js'
# Clear the terminal
clear

npm init -y

clear

sleep 1

npm i express
clear

sleep 1
# Run the server
node server.js