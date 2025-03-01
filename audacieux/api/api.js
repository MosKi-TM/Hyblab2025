'use strict';

const express = require('express'); // Importez express correctement
const app = express(); // Créez une instance d'express
const path = require('path');

// Middleware pour servir les fichiers statiques (images)
const imagesPath = path.join(__dirname, '/public/img'); // Chemin vers le dossier des images
app.use('/img', express.static(imagesPath));


// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

// Export our API
module.exports = app;
