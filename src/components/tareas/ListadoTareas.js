import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/TareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {

    //Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    //obtener las tareas del proyecto
    const tareasContext = useContext(TareaContext);
    const {tareasproyecto} =  tareasContext;

    //Si no hay un proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un Proyecto</h2>

    const [proyectoActual] = proyecto;

    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id); 
    }

    return (  
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ? (<li className="tarea"><p>No Hay Tareas</p></li>)
                    : 
                    <TransitionGroup>
                      {tareasproyecto.map(tarea=>(
                        <CSSTransition
                            key = {tarea._id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea                            
                                tarea={tarea}
                            /> 
                        </CSSTransition>   
                      ))}
                    </TransitionGroup>
                }   
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >
            Eliminar Proyecto &times;    
            </button>  

        </Fragment>
    );
}
 
export default ListadoTareas;