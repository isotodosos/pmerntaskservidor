const mongoose = require("mongoose");

//vamos a declarar la estructura que va a tener en la bbdd Usuario a través de la funcion Schema de mongoose.
// el mismo mongoose nos valida el esquema poniendo required.
const UsuarioSchema = mongoose.Schema({
    nombre : {
        type : String,
        required: true,
        trim : true
    },
    email : {
        type : String,
        required: true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required: true,
        trim : true
    },
    registro : {
        type : Date,
        default : Date.now()
    }
});


// asi le decimos a mongose que se cree una coleccion (Usuario) con el modelo de esquema creado (UsuarioSchema)
module.exports = mongoose.model('Usuario', UsuarioSchema);
