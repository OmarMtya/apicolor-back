var Proyecto = require('../models/proyecto');

function getProyectos(req, res) {
    Proyecto.find({}).populate('categoria').exec(function(err, data){
        res.status(200).send(data);        
    });
}

function getProyecto(req, res){
    var _id = req.params.id;
    Proyecto.findOne({_id}).populate('categoria').exec(function(err, data){
        if(err) res.status(400).send("error");
        res.status(200).send(data);
    });
}

function postProyecto(req, res){
    console.log(req.body);
    var proyecto = new Proyecto();
    if(req.body.nombre && req.body.descripcion && req.body.categoria && req.body.subcategoria){
        proyecto.nombre = req.body.nombre;
        proyecto.categoria = req.body.categoria;
        proyecto.subcategoria = req.body.subcategoria;
        proyecto.descripcion = req.body.descripcion;
        if(proyecto.save()){
            res.status(200).send(proyecto);
        }else{
            res.status(400).send("error servidor");
        }
    }else{
        res.status(400).send("error data");
    }
}

module.exports = { getProyectos, getProyecto, postProyecto };