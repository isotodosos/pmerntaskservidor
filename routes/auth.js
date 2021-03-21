// rutas para autenticar usuarios

const express = require ('express');
const authController = require('../controllers/authController');
const router = express.Router();
const auth = require ('../middelware/auth');
const { check } = require('express-validator'); // esta funcion va a validar los campos. Las reglas de express-validator van en el routing pero los resultados en el controlador


//Iniciar Sesion
//Su endpoint va a ser: api/auth
router.post('/',
authController.autenticarUsuario);

//obtener usuario autenticado
router.get('/',
auth,
authController.usuarioAutenticado
);

module.exports = router;