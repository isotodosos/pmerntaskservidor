const express = require('express');//asi se importa en node
const conectarDB = require('./config/db');

const cors = require('cors'); // permite cambio de recursos entre dominios de forma segura ya que el front y el back estan en dos direcciones diferentes (3000 y 4000).


//creamos el servidor al que llamamos app
const app = express();

conectarDB();

//habilitar cors
app.use(cors()); 

//Puerto de la app: si no existe la variable ... al puerto 4000 ya que en el 3000 corre el cliente generalmente
const PORT = process.env.PORT || 4000;


// Habilitar express.json que sustituye a bodyparser para trabajar con json
app.use( express.json({extended: true})) // cuando pones express.json tienes que enviar en postman el header como content-type y de valor aplication/json
// Importar rutas.En express a cada uno de estos se les llama middleware 
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/auth', require('./routes/auth') );
app.use('/api/proyectos', require('./routes/proyectos') );
app.use('/api/tareas', require('./routes/tareas') );



//arranca la app...

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en por el puerto ${PORT}`);
});

  

