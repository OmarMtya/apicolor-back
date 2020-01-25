var app = require("express")();
var http = require("http").Server(app);
var bodyParser = require("body-parser");
var port = process.env.PORT || 3000;
// var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var categoriasRouter = require("./routes/categorias");
var proyectosRouter = require("./routes/proyectos");
var generadorRouter = require("./routes/generador-paleta");

let buff = new Buffer.from("APIS-2O2O");
let base64data = buff.toString("base64");

// Configuraciones
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Allow", "GET, POST");
  next();
});

console.clear();


// Rutas
app.use('/api', categoriasRouter);
app.use('/api', proyectosRouter);
app.use('/api', generadorRouter);


// Conexión base de datos
mongoose.connect('mongodb://localhost:27017/apicolor', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado a mongo");
  }).catch((err) => {
    console.log(err);
  });

http.listen(port, function () {
    console.log('listening on *:' + port);
});

