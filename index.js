//console.log("Hola mundo");

//const x =0;
//let y = 0; var z = 0;

const express =require("express"); //llama a la libreria express
const res = require("express/lib/response");
const app = express();
const { pokemon } = require('./pokedex.json');
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

app.post("/pokemon", (req,res,next)=>{
    return res.status(200).send(req.body.name);
})


app.get("/pokemon/", (req, res, next) =>{ // "/:name", dos puntos para crear variable
    //console.log(req.params.name);
    return res.status(200).send(pokemon);
}); //obtener datos del usuario apartir de la URL

app.get('/pokemon/:id([0-9]{1,3})', (req,res,next)=>{ //([0-9]{1,3})funcion para solo aceptar numeros, [0-9] acepta digitos del 0 al 9, {1,3} acepta numeros entre 1 a 3 digitos
    const id = req.params.id - 1;
    (id >= 0 && id <= 150) ?
        res.status(200).send(pokemon[req.params.id - 1]):
        res.status(404).send("Pokémon no encontrado");
});

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next)=>{
    const name = req.params.name;
    /*for(i =0; i<pokemon.length;i++){
        if(pokemon[i].name.toUpperCase==name.toUpperCase){
            return res.status(200).send(pokemon[i]);
        }
    }*/

    const pk= pokemon.filter((p)=>{
        return (p.name.toUpperCase() == name.toUpperCase()) &&p;
        //operador ternario: condicion a evaluar? valor si verdadero:valor si falso
    });

    console.log(pk);
    (pk.length > 0) ? 
    res.status(200).send(pk):
    res.status(404).send("Pokémon no encontrado");
});

app.listen(process.env.PORT || 3000,()=> {          //3000 puerto, 
    console.log("Server is running...");
}); 
