import {
    TAREAS_PROYECTO, 
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA  
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                //tareasproyecto : state.tareasproyecto.filter(tarea => tarea.proyectoId === action.payload)
                tareasproyecto : action.payload //Cuando obtenemos de la api usamos lo que viene del back. Lo de arriba era solo para probar el front
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasproyecto : [action.payload, ...state.tareasproyecto],
                errortarea : false
            }  
        case VALIDAR_TAREA: 
            return {
                ...state,
                errortarea : true
            }   
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto : state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:            
            return {
                ...state,
                tareasproyecto : state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea) //Se itera las lista de tareas. Si la tareas es la modificada se la retorna (action.payload). En caso contrario se la retorna tal y cual esta
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada : action.payload
            } 
        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaseleccionada : null
            }                              
        default:
            return state;
    }
}