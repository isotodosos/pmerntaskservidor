const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');

const { validationResult } = require('express-validator');//esta funcion tiene los resultados validados



exports.crearTarea = async (req,res) => {

    // revisar si hay errores
    const errores = validationResult(req);//si validationResult() encuentra errores en la req, llenará un array en const errores
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }

  
    try {

        //Extraemos el proyecto y comprobamos que exista
        const {proyecto} = req.body;
        
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            res.status(404).json({msg : 'Proyecto no encontrado'})
        }

                
        // verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){//toString es de ES10 y lo mismo no lo coge
            return res.status(401).json({msg: 'Usuario no autorizado'});
        }
        


        // creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

        
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Hubo un error');
    }
}


exports.obtenerTareas = async (req, res) => {

    try {

        //Extraemos el proyecto y comprobamos que exista
        const {proyecto} = req.query;
        
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            res.status(404).json({msg : 'Proyecto no encontrado'})
        }

        
        
        // verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){//toString es de ES10 y lo mismo no lo coge
            return res.status(401).json({msg: 'Usuario no autorizado'});
        }
        


        // obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto }).sort({creado : -1});//esto ultimo cambia el orden
        res.json({tareas});
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Hubo un error');
    }
} 


exports.actualizaTarea = async (req,res) => {

    try {

        //Extraemos el proyecto y comprobamos que exista
        const {proyecto, nombre, estado} = req.body;

        // comprobamos si la tarea existe
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            res.status(404).json({msg : 'No existe la tarea'})
        }
        
        
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            res.status(404).json({msg : 'Proyecto no encontrado'})
        }
        

        
        // verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){//toString es de ES10 y lo mismo no lo coge
            return res.status(401).json({msg: 'Usuario no autorizado'});
        }
        


        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        tarea = await Tarea.findOneAndUpdate({ _id : req.params.id },  {$set : nuevaTarea}, { new : true});
        res.json({tarea});

        
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Hubo un error');
    }
}


exports.eliminarTarea = async (req,res) => {

    try {

        //Extraemos el proyecto y comprobamos que exista
        const {proyecto} = req.query;

        // comprobamos si la tarea existe
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            res.status(404).json({msg : 'No existe la tarea'})
        }
        
        
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            res.status(404).json({msg : 'Proyecto no encontrado'})
        }
        

        
        // verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){//toString es de ES10 y lo mismo no lo coge
            return res.status(401).json({msg: 'Usuario no autorizado'});
        }
        


        //Eliminamos la tarea
        await Tarea.findOneAndRemove({ _id : req.params.id});
        res.json({msg : 'Tarea eliminada'});
        

        
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Hubo un error');
    }
}