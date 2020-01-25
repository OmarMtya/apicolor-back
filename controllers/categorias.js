var categoriaScheema = require('../models/categoria');

function getCategorias(req, res){
     categoriaScheema.find({}, function(err, data){
          res.status(200).send(data);
     });
}

module.exports = {
     getCategorias
};