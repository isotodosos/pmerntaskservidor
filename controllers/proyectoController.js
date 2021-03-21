const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');//esta funcion tiene los resultados validados


exports.crearProyecto = async (req,res) => {

    // revisar si hay errores
    const errores = validationResult(req);//si validationResult() encuentra errores en la req, llenará un array en const errores
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }

    try {

        const proyecto = new Proyecto(req.body);

        // guardamos el creador via jwt
        proyecto.creador = req.usuario.id;

        proyecto.save();

        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Hubo un error');
    }
}

//obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req,res) => {
    
        
    try {
        
        const proyectos = await Proyecto.find({creador : req.usuario.id}).sort({creado : 1});

        res.json({proyectos});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
    

}


// Actualizar un proyecto
exports.actualizarProyecto = async (req,res) => {

    // revisar si hay errores
    const errores = validationResult(req);//si validationResult() encuentra errores en la req, llenará un array en const errores
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }

    // extraer la información
    const {nombre} = req.body;
    const nuevoProyecto = {};
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }


    try {

        // revisar el id
        let proyecto = await Proyecto.findById(req.params.id);
        // si el proyecto existe o no
        if(!proyecto) {
            res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        
        
        // verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario._id){//toString es de ES10 y lo mismo no lo coge
            return res.status(401).json({msg: 'Usuario no autorizado'});
        }
        

        // actualizar
        proyecto = await Proyecto.findByIdAndUpdate({_id : req.params.id}, {$set : nuevoProyecto}, {new : true});
        return res.status(200).json({proyecto});
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }

}

// Elimina un proyecto
exports.eliminarProyecto = async (req,res) => {

    try {

        // revisar el id
        let proyecto = await Proyecto.findById(req.params.id);
        console.log(proyecto);
        // si el proyecto existe o no
        if(!proyecto) {
            res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        
        // verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){//toString es de ES10 y lo mismo no lo coge
            return res.status(401).json({msg: 'Usuario no autorizado'});
        }
        

        // eliminar el proyecto
        await Proyecto.findOneAndRemove({_id : req.params.id});
        return res.status(200).json({msg : 'Proyecto eliminado'});
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }

}