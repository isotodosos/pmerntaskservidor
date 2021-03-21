const jwt = require('jsonwebtoken');


module.exports  = function (req, res, next) {

    // Leer el token del header
    
    const token = req.header('x-auth-token');
   

    // Revisar si no hay token

    if(!token){
        return res.status(401).json({ msg : 'No hay token, permiso no válido'});
    }

    // Validar el token

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        //console.log(req.usuario);
        console.log(cifrado.usuario);
        req.usuario = cifrado.usuario //este usuario de cifrado es el usuario del payload y se lo añadmos como valor a un req.usuario que creamos en este momento
        next();// con next se va a al siguiente middelware
        
    } catch (error) {
        res.status(401).json({ msg : 'El token no es válido'});
    }
    
}