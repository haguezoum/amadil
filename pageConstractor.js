#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const pagetName = process.argv[2];


const pagePath = path.join(process.cwd(), 'frontend', 'src', 'pages', `${pagetName}.js`);