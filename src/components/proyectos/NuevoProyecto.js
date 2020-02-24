import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {formulario, errorfomulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    //State para el proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    //extraer nombre del proyecto
    const {nombre} = proyecto;

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        });
    }

    const onSubmitProyecto = e => {
        e.preventDefault();
        //validad proyecto
        if(nombre === ''){
            mostrarError();     
            return;
        }        
        //agregar al state
        agregarProyecto(proyecto);

        //reiniciar proyecto
        guardarProyecto({
            nombre : ''
        });
    }


    return ( 
        <Fragment>
        <button
            type="button"
            className="btn btn-block btn-primario"
            onClick = {()=>mostrarFormulario()}
        >
        Nuevo Proyecto</button>

        {formulario
            ?
            (
                <form 
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProyecto}
                >   

                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />

                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"                        
                    />

                </form>
            )
            : null
        }

        {errorfomulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}

        </Fragment>
     );
}
 
export default NuevoProyecto;