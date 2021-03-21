const express = require ('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middelware/auth');//asi creamos nuestro middleware personalizado
const { check } = require('express-validator'); // esta funcion va a validar los campos. Las reglas de express-validator van en el routing pero los resultados en el controlador



//Su endpoint va a ser: api/proyectos

//Crea un proyecto
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);


// Obtiene todos los proyectos
router.get('/', 
    auth,
    proyectoController.obtenerProyectos
);


//Actualiza un proyecto por su id
router.put("/:id",
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()  
    ],
    proyectoController.actualizarProyecto
);

//Elimina un proyecto por su id
router.delete("/:id",
    auth,
    proyectoController.eliminarProyecto
);


module.exports = router;