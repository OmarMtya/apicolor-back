var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProyectoSchema = Schema({
    nombre: String,
    categoria: { type: Schema.ObjectId, ref: 'categoria' },
    subcategoria: String,
});

module.exports = mongoose.model('proyecto', ProyectoSchema);