//console.log("Hola mundo");

//const x =0;
//let y = 0; var z = 0;

const express =require("express"); //llama a la libreria express
const app = express();
const { pokemon } = require('./pokedex.json');

/*los verbos hhtp 
GET-obtener un recurso
POST-guardar o publicar
PATH- actualización-un dato de un recurso
PUT-actualización-todos los elementos
DELETE-eliminar recursos
*/

app.get("/", (req, res, next) =>{ //req-petición, res-respuesta, next-
    res.status(200);
    res.send("Bienvenido al Pokedex");
});

app.get("/pokemon/all", (req, res, next) =>{ // "/:name", dos puntos para crear variable
    //console.log(req.params.name);
    res.status(200);
    res.send(pokemon);
}); //obtener datos del usuario apartir de la URL

app.get('/pokemon/:id([0-9]{1,3})', (req,res,next)=>{ //([0-9]{1,3})funcion para solo aceptar numeros, [0-9] acepta digitos del 0 al 9, {1,3} acepta numeros entre 1 a 3 digitos
    const id = req.params.id - 1;
    if(id >= 0 && id <= 150){
        res.status(200);
        return res.send(pokemon[req.params.id - 1]);
    }
    //else{
        res.status(404);
        res.send("Pokémon no encontrado");
    //}

});

app.get('/pokemon/:name', (req, res, next)=>{
    const name = req.params.name;
    for(i =0; i<pokemon.length;i++){
        if(pokemon[i].name==name){
            res.status(200);
            res.send(pokemon[i]);

        }
    }
    res.status(404);
    res.send("Pokémon no encontrado");
});

app.listen(process.env.PORT || 3000,()=> {          //3000 puerto, 
    console.log("Server is running...");
}); 
