var express = require('express');
var api = express.Router();
var generadorController = require("../controllers/generador-paleta");

api.get('/generar/:id', generadorController.generarPaleta);

module.exports = api;