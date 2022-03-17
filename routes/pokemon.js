const express = require("express");
const pokemon = express.Router();
//const pk  = require('../pokedex.json').pokemon;
const db = require('../config/database');

pokemon.post("/", async (req,res,next)=>{
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience ){
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
        query += `  VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

        const rows = await db.query(query);
        if(rows.affectedRows ==1 ){
            return res.status(201).json({code:201, message: "Pokemon insertado"});
        }
        
        return res.status(500).json({code:500, message:"Ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos incompletos"});
});

pokemon.delete('/:id([0-9]{1,3})', async (req,res,next) =>{
    const query=`DELETE FROM pokemon WHERE pok_id = ${req.params.id}`;

    const  rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({code:200, message: "Pokemon borrado"});
    }
    return res.status(404).json({code:404, message: "Pokemon no encontrado"});
});

pokemon.put('/:id([0-9]{1,3})', async (req,res,next) =>{
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience ){
        let query=`UPDATE pokemon SET pok_name= '${pok_name}', pok_height= ${pok_height}, `;
        query += `pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id= ${req.params.id};`;

        const rows = await db.query(query);
        if(rows.affectedRows ==1 ){
            return res.status(201).json({code:200, message: "Pokemon actualizado"});
        }
        
        return res.status(500).json({code:0000, message:"Ocurrio un error"});
    }
    return res.status(500).json({code:500, message:"Campos incompletos"});
});

pokemon.patch('/:id([0-9]{1,3})', async (req,res,next) =>{

    if(req.body.pok_name){
        let query=`UPDATE pokemon SET pok_name= '${req.body.pok_name}' WHERE pok_id= ${req.params.id};`;

        const rows = await db.query(query);
        if(rows.affectedRows ==1 ){
            return res.status(201).json({code:200, message: "Pokemon actualizado"});
        }
        return res.status(500).json({code:500, message: "Oops! Ocurrio un error"});
    }
    return res.status(500).json({code:500, message: "Campos incompletos"});
});

pokemon.get("/", async (req, res, next) =>{ // "/:name", dos puntos para crear variable
    //console.log(req.params.name);
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code:1, message:pkmn});
}); //obtener datos del usuario apartir de la URL

pokemon.get(':id([0-9]{1,3})', async (req,res,next)=>{ //([0-9]{1,3})funcion para solo aceptar numeros, [0-9] acepta digitos del 0 al 9, {1,3} acepta numeros entre 1 a 3 digitos
    const id = req.params.id;
    if(id>=1 && id <= 722){
        const pkmn= await db.query("SELECT * FROM pokemon WHERE pok_id="+id+";");
        return res.status(200).json({code:200, message: pkmn});
    }
    return res.status(404).send({code: 404, message: "Pokemon no encontrado"});
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next)=>{
    const name = req.params.name; 
    /*for(i =0; i<pokemon.length;i++){
        if(pokemon[i].name.toUpperCase==name.toUpperCase){
            return res.status(200).send(pokemon[i]);
        }
    }*/

    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name="+name+";");
    
    /*const pkmn= pk.filter((p)=>{
        return (p.name.toUpperCase() == name.toUpperCase()) &&p;
        //operador ternario: condicion a evaluar? valor si verdadero:valor si falso
    });*/

    if(pkmn.length > 0){
        //const name = req.params.name;
        return res.status(200).json({code:200, message: pkmn});
    }
    return res.status(404).send({code: 404, message: "Pokemon no encontrado"});
});

module.exports = pokemon;