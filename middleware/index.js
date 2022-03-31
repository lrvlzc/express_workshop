module.exports = (req, res, next) =>{ //req-petición, res-respuesta, next-
    return res.status(200).json({code:1, message:"Bienvenido al Pokedex"});
}