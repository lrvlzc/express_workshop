const express = require("express");
const pokemon = express.Router();
//const pk  = require('../pokedex.json').pokemon;
const db = require('../config/database');

pokemon.post("/", (req,res,next)=>{
    return res.status(200).send(req.body.name);
})


pokemon.get("/", async (req, res, next) =>{ // "/:name", dos puntos para crear variable
    //console.log(req.params.name);
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
}); //obtener datos del usuario apartir de la URL

pokemon.get(':id([0-9]{1,3})', (req,res,next)=>{ //([0-9]{1,3})funcion para solo aceptar numeros, [0-9] acepta digitos del 0 al 9, {1,3} acepta numeros entre 1 a 3 digitos
    const id = req.params.id - 1;
    //const pkmn=await db.query("SELECT id FROM pokemon WHERE id between 0 and 150");
    (id >= 0 && id <= 150) ?
        res.status(200).send(pk[req.params.id - 1]):
        res.status(404).send("Pokémon no encontrado");
});

pokemon.get('/:name([A-Za-z]+)', (req, res, next)=>{
    const name = req.params.name;
    /*for(i =0; i<pokemon.length;i++){
        if(pokemon[i].name.toUpperCase==name.toUpperCase){
            return res.status(200).send(pokemon[i]);
        }
    }*/

    const pkmn= pk.filter((p)=>{
        return (p.name.toUpperCase() == name.toUpperCase()) &&p;
        //operador ternario: condicion a evaluar? valor si verdadero:valor si falso
    });

    if(pkmn.length > 0){
        //const pkmn = await db.query("SELECT name FROM pokemon");
        return res.status(200).send(pkmn);
    }
    return res.status(404).send("Pokemon no encontrado");
});


module.exports = pokemon;