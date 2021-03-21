// rutas para  usuarios

const express = require ('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();
const { check } = require('express-validator'); // esta funcion va a validar los campos. Las reglas de express-validator van en el routing pero los resultados en el controlador


//Crea un usuario
//Su endpoint va a ser: api/usuarios
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe de tener minimo 6 caracteres').isLength({ min : 6})
], usuarioController.crearUsuario);

module.exports = router;