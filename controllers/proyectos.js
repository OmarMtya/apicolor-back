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

module.exports = { getProyectos, getProyecto };