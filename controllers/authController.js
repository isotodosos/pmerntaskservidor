const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");

const jwt = require('jsonwebtoken');// al no haber variables globales ya que javascript no es un lenguaje de servidor se utila jwk para almacenar datos seguros y enviarlos entre aplicaciones de forma segura con json


exports.autenticarUsuario = async (req,res) => {
 
    
    
    const {email, password} = req.body;
    
    try {
        
        // vamos a revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({ msg : 'El usuario no existe'});
        }
        
                
        //Revisamos el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({ msg : 'El password es incorrecto'});
        }

        
        // Creamos el jwt
        //creamos con el payload y firmamos con sign el json-web-token como que es segura
        const payload = {
            usuario : {
                id : usuario.id //guardamos como payload el id del usuario
            }
        };
        //firma del jwt 
        jwt.sign(payload, process.env.SECRETA , {
            expiresIn : 360000000 //Ej: caduca en 36000segundos = 10h
        }, (error, token) => {
            if(error) throw error;
            
            res.json({ token : token });

        });
       
        
    } catch (error) {
        console.log(error);
    }
}



// obtiene que usuario esta autenticado

exports.usuarioAutenticado = async (req, res) => {

    try {

        const usuario = await Usuario.findById(req.usuario.id).select('-password');//asi eliminas el traer el password
        res.json({ usuario });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg : 'Hubo un error'});
    }

}