var categoriaScheema = require('../models/categoria');

function getCategorias(req, res){
     categoriaScheema.find({}, function(err, data){
          if (err) res.status(400).send("error");
          res.status(200).send(data);
     });
}

function getCategoria(req, res){
     
     categoriaScheema.findOne({ _id: req.params.id}, function(err, data){
          if(err) res.status(400).send("error");
          res.status(200).send(data);
     });
}

module.exports = {
     getCategorias,
     getCategoria
};