import React, { useReducer } from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
//import uuid from 'uuid';
import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,  
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA  
} from '../../types';

const TareaState = props => {
    const initialState = {
        /* tareas : [
            { id:1, nombre: 'Elegir Plataforma', estado: true, proyectoId : 1},
            { id:2, nombre: 'Elegir Colores', estado: false, proyectoId : 2},
            { id:3, nombre: 'Elegir Plataformas de Pago', estado: false, proyectoId : 3},
            { id:4, nombre: 'Elegir Hosting', estado: true, proyectoId : 4},
            { id:5, nombre: 'Elegir Plataforma', estado: true, proyectoId : 2},
            { id:6, nombre: 'Elegir Colores', estado: false, proyectoId : 1},
            { id:7, nombre: 'Elegir Plataformas de Pago', estado: false, proyectoId : 3},
            { id:8, nombre: 'Elegir Hosting', estado: true, proyectoId : 4},
            { id:9, nombre: 'Elegir Plataforma', estado: true, proyectoId : 2},
            { id:10, nombre: 'Elegir Colores', estado: false, proyectoId : 1},
            { id:11, nombre: 'Elegir Plataformas de Pago', estado: false, proyectoId : 3},
            { id:12, nombre: 'Elegir Hosting', estado: true, proyectoId : 4}
        ], */
        tareasproyecto : [],
        errortarea : false,
        tareaseleccionada : null
    }

    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //OBTENER LAS TAREAS DE UN PROYECTO
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas/', { params : { proyecto }});
            console.log(resultado);
            dispatch({
                type : TAREAS_PROYECTO,
                payload : resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        //tarea.id = uuid.v4();
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            //console.log(resultado);
            dispatch({
                type : AGREGAR_TAREA,
                payload : tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Valida y muestra un error
    const validadTarea = () =>{
        dispatch({
            type : VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params : { proyecto }});
            dispatch({
                type : ELIMINAR_TAREA,
                payload : id
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Edita una tarea
    const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado);
            dispatch({
                type : ACTUALIZAR_TAREA,
                payload : resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type : TAREA_ACTUAL,
            payload : tarea
        })
    }

    //Elimina la tarea seleccionada
    const limpiarTarea = () =>{
        dispatch({
            type : LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                //tareas : state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea : state.errortarea,
                tareaseleccionada : state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validadTarea,
                eliminarTarea,                
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;
