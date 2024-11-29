const express = require('express');
const path = require('path');
const app = express();
// Serve the static files like css, js, images
app.use(express.static(path.join(__dirname, 'frontend')));
app.get('/*', (req, res) => {res.sendFile(path.join(__dirname, 'frontend', 'public', 'index.html'));});
app.listen(3000, () => {console.log("Server is running on : http://localhost:3000");});