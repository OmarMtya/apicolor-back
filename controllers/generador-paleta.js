var Proyecto = require("../models/proyecto");
var fetch = require('request');
function generarPaleta(req, res){
    Proyecto.findOne({ _id: req.params.id }).populate('categoria').exec(function(err, dataMongo){
        if(err){ res.status('400').send("error"); }

        var subcategoria = dataMongo.categoria.subcategorias.find((x) => x.nombre == dataMongo.subcategoria); // Encontrar la subcategoría en el objeto de categorias para traerme los colores posibles
        var promesasPaletas = [];
        var output = {};

        if(!subcategoria){
            res.status(200).send("error");
            return;
        }
        subcategoria.colores.forEach(color => {
            promesasPaletas.push( getPaletaColor(color) );
        });

        Promise.all(promesasPaletas).then((data)=>{
            var promesasNombresColores = [];
            data.forEach((paleta, index) => { // Paleta de colores
                paleta.forEach((color, idx) => { // Color individual
                    promesasNombresColores.push(getNombreColor(color));
                });
            });
            return Promise.all(promesasNombresColores);
        }).then((promesas)=>{
            return new Promise((res, rej)=>{
                var promesasRetorno = [];
                var contador = -1;
                console.log(promesas.length);
                
                promesas.forEach((data, index) => {
                    if ((index) % 5 == 0) {
                        promesasRetorno[++contador] = [];
                    }
                    promesasRetorno[contador].push(limpiarData(data));
                });
                res(promesasRetorno);
            });
        }).then((data)=>{
            output.paletas = data;
            var promesasColores = [];
            subcategoria.colores.forEach((color) => {
                promesasColores.push( getMonocromatica((removerHash(color))) );
            });

            return Promise.all(promesasColores);
        }).then((data)=>{
            var paquetes = [];
            data.forEach(promesa => {
                paquetes.push(limpiarMonoCromatico(promesa));
            });
            output.monocromaticas = paquetes;
            res.status(200).send(output);
        }).catch((err)=>{
            console.log(err);
        });

    });
}

function getPaletaColor(color){
    color = removerHash(color);
    return new Promise((res, rej)=>{
        fetch.get('https://palett.es/API/v1/palette/from/' + color, { json: true },
            function (err, response, body) {
                if(err) rej(err);
                res(body);
            });
    });
}

function getNombreColor(color){
    color = removerHash(color);
    return new Promise((res, rej)=>{
        fetch.get('https://www.thecolorapi.com/id?hex='+color, {json: true},
            function(err, response, body){
                if(err) rej(err);
                res(body);
            });
    });
}

function getMonocromatica(color){
    return new Promise((res, rej) => {
        fetch.get('https://www.thecolorapi.com/scheme?hex='+color+'&mode=monochrome&count=5', {json: true},
            function(err, response, body){
                if(err) rej(err);
                res(body);
            });
        
    });
}

function removerHash(color){
    return color.replace(/\#/, '');
}

function limpiarMonoCromatico(data){
    delete data.mode;
    delete data.count;
    data.colors.forEach((color, index, array) => {
        array[index] = limpiarData(color);
    });
    delete data.seed;
    delete data._links;
    delete data._embedded;
    return data;
}

function limpiarData(data){
    delete data.rgb;
    delete data.hsl;
    delete data.hsv;
    delete data.cmyk;
    delete data.XYZ;
    delete data._links;
    delete data._embedded;
    delete data.name.closest_named_hex;
    delete data.name.exact_match_name;
    delete data.name.distance;
    delete data.image.named;
    return data;
}

module.exports = { generarPaleta };