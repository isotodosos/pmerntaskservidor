const express = require ('express');
const router = express.Router();
const tareaController = require('../controllers/tareaContoller');
const auth = require('../middelware/auth');//asi creamos nuestro middleware personalizado
const { check } = require('express-validator'); // esta funcion va a validar los campos. Las reglas de express-validator van en el routing pero los resultados en el controlador



//Su endpoint va a ser: api/tareas
//Crear un tarea
router.post('/',
auth,
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
],
tareaController.crearTarea);

// Obtener tareas
router.get('/',
auth,
tareaController.obtenerTareas);


// Actualizar Tarea
router.put('/:id',
auth,
tareaController.actualizaTarea);


//Eliminar tarea
router.delete('/:id',
auth,
tareaController.eliminarTarea);




module.exports = router;