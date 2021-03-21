const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');//esta funcion tiene los resultados validados
const jwt = require('jsonwebtoken');// al no haber variables globales ya que javascript no es un lenguaje de servidor se utila jwk para almacenar datos seguros y enviarlos entre aplicacionesde forma segura con json

// Request es lo que el usuario envia. Response la respuesta de la bbdd
exports.crearUsuario = async (req,res) => { 

    // revisar si hay errores
    const errores = validationResult(req)//si validationResult() encuentra errores en la req, llenará un array en const errores
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }
    const {email, password} = req.body;
    
    try{
        // revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});
        
        if(usuario){
            console.log(usuario);
            return res.status(400).json({ msg : 'El usuario ya existe'});
        }

        // crear un nuevo usuario
        usuario = new Usuario(req.body);
        //hasheamos el password para codificarlo. salt te permite tener varias passwords haseadas iguales.
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);
        
        // guardamos el usuario
        await usuario.save();
        

        //creamos con el payload y firmamos con sign el json-web-token como que es segura
        const payload = {
            usuario : {
                id : usuario._id //guardamos como payload el id del usuario
            }
        };
        //firma del jwt 
        jwt.sign(payload, process.env.SECRETA , {
            expiresIn : 360000000 //caduca en 3600segundos = 1h
        }, (error, token) => {
            if(error) throw error;

            res.json({ token : token });

        });
        

    }catch(error){
      
        console.log(error)
        res.status(400).send('Hubo un error')
       
        
    }
}

