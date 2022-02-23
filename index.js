//console.log("Hola mundo");

//const x =0;
//let y = 0; var z = 0;

const express =require("express"); //llama a la libreria express
const app = express();

/*los verbos hhtp 
GET-obtener un recurso
POST-guardar o publicar
PATH- actualización-un dato de un recurso
PUT-actualización-todos los elementos
DELETE-eliminar recursos
*/

app.get("/", (req, res, next) =>{ //req-petición, res-respuesta, next-
    res.status(200);
    res.send("Bienvenido");
});

app.listen(3000,()=> {          //3000 puerto, 
    console.log("Server is running...");
}); 
