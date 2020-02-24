import React, {useContext, useReducer} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const Proyecto = ({proyecto}) => {

    //Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    //obtener las funciones del context de tareas
    const tareasContext = useContext(TareaContext);
    const {obtenerTareas} =  tareasContext;

    //Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); //Fijar un proyecto actual
        obtenerTareas(id);
    }

    return ( 
        <button
            type="button"
            className="btn btn-blank"
            onClick={ ()=> seleccionarProyecto(proyecto._id) } //Cuando integramos con el backend podemos con _ porque mongo lo utiliza de esa manera
        >
        {proyecto.nombre}</button>
     );
}
 
export default Proyecto;