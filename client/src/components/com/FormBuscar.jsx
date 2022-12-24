import React from 'react';
import s from '../../css/formbuscar.module.css';
import Boton from '../com/Boton';
import iconoBuscar from '../imagenes/ic_lupa.svg';
import CajaTexto from '../com/CajaTexto';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SET_MENSAJES } from '../../redux/types/index';
import { useDispatch } from 'react-redux';

export const validarNombreBusqueda = (nombre, dispatch) => {
    let mensajes = '';
    if (nombre.toString().trim().length === 0) {
        mensajes = 'No escribiste nada en la busqueda';
        dispatch({ type: SET_MENSAJES, payload: mensajes })
    }

    return mensajes;
};

const FormBuscar = ({ formProps }) => {

    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');
    const navegar = useNavigate();

    const handleChange = (e) => {
        setNombre(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarNombreBusqueda(nombre, dispatch) === '') {
            navegar(`/pokemons/busqueda/${nombre.toLowerCase()}`);
            //setNombre('')
        }
    };

    return (
        <form {...formProps} className={s.contenedor} onSubmit={handleSubmit} >
            <CajaTexto texto='Buscador' propsInput={{ type: 'text', onChange: handleChange, placeholder: 'Nombre del Pokemon' }} />
            <Boton type='submit' icono={iconoBuscar} alt='Buscar' />
        </form>
    );
};

export default FormBuscar;