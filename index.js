//console.log("Hola mundo");

//const x =0;
//let y = 0; var z = 0;
const bodyParser = require('body-parser');
const morgan= require("morgan");
const express =require("express"); //llama a la libreria express
//const res = require("express/lib/response");
const app = express();
const pokemon =require('./routes/pokemon');

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



/*los verbos hhtp 
GET-obtener un recurso
POST-guardar/ crear recursos
PATCH- actualización-un dato de un recurso
PUT-actualización-todos los elementos
DELETE-eliminar recursos
*/



app.get("/", (req, res, next) =>{ //req-petición, res-respuesta, next-
    return res.status(200).send("Bienvenido al Pokedex");
});


app.use("/pokemon", pokemon);

app.listen(process.env.PORT || 3000,()=> {          //3000 puerto, 
    console.log("Server is running...");
}); 

