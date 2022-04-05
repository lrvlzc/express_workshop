//console.log("Hola mundo");

//const x =0;
//let y = 0; var z = 0;
//const bodyParser = require('body-parser');
//Dependencias
const morgan= require("morgan");
const express =require("express"); //llama a la libreria express
//const res = require("express/lib/response");
const app = express();
//routers
const pokemon =require('./routes/pokemon');
const user = require('./routes/user');
const req = require("express/lib/request");
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
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

app.get("/", index);

app.use("/user", user);
app.use(auth);

app.use("/pokemon", pokemon);

app.use(notFound);

app.listen(process.env.PORT || 3000,()=> {          //3000 puerto, 
    console.log("Server is running...");
}); 

