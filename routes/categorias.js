var express = require('express');
var api = express.Router();
var categoriasController = require("../controllers/categorias");

api.get('/categorias', categoriasController.getCategorias);
api.get('/categoria/:id', categoriasController.getCategoria);

module.exports = api;