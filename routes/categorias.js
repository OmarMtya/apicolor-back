var express = require('express');
var api = express.Router();
var categoriasController = require("../controllers/categorias");

api.get('/categorias', categoriasController.getCategorias);

module.exports = api;