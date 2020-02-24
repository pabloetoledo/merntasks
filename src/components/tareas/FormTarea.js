import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const FormTarea = () => {

    //Obtener si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //obtener las funciones del context de tareas
    const tareasContext = useContext(TareaContext);
    const {tareaseleccionada, errortarea, agregarTarea, validadTarea, 
        obtenerTareas, actualizarTarea, limpiarTarea } =  tareasContext;

    //Effect que detecta si hay una tarea seleccionada
    useEffect(()=>{
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada);
        }else{
            guardarTarea({
                nombre : ''
            });
        }
    }, [tareaseleccionada])

    //state del formulario
    const [tarea, guardarTarea] = useState({
        nombre : ''
    })

    //extraer el nombre del proyecto
    const { nombre } = tarea;

    //Si no hay un proyecto seleccionado
    if(!proyecto) return null;

    const [proyectoActual] = proyecto;


    //Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === ''){
            validadTarea();
            return;
        }

        //Si es edicion o si es nueva tarea
        if(tareaseleccionada === null){
            //Tarea nueva
            //agregar una tarea al state de tareas
            //tarea.proyectoId = proyectoActual.id; 
            tarea.proyecto = proyectoActual._id; //YA que mongo utiliza _ (guion bajo). Proyecto se debe enviar como proyecto, no como proyectoId
            //tarea.estado = false; //el estado ya no es necesario porque por defecto se crea como false
            agregarTarea(tarea);
        } else{
            //Es una edicion
            actualizarTarea(tarea);

            //Elimina tarea seleccioada del state
            limpiarTarea();
        }

        //Obtener y filtrar las tareas del proyecto
        obtenerTareas(proyectoActual._id);

        //reiniciar el form
        guardarTarea({
            nombre : ''
        })
    }

    return ( 

        <div className="formulario">
            <form 
                onSubmit = {onSubmit}
                >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value = {nombre}
                        onChange = {handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>: null}
        </div>
     );
}
 
export default FormTarea;