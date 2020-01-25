var mongoose = require('mongoose');
var Scheema = mongoose.Schema;

var CategoriaSchema = Scheema({
    nombre: String,
    subcategorias: [
        {
            nombre: String,
            colores: [String]
        }
    ]
});

module.exports = mongoose.model('categoria', CategoriaSchema);