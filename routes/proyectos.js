var express = require('express');
var api = express.Router();
var proyectosController = require("../controllers/proyectos");

api.get('/proyectos', proyectosController.getProyectos);
api.get('/proyecto/:id', proyectosController.getProyecto);
api.post('/proyecto', proyectosController.postProyecto);

module.exports = api;