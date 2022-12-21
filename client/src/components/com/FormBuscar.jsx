import React from 'react';
import s from '../../css/formbuscar.module.css'
import Boton from '../com/Boton';
import iconoBuscar from '../imagenes/ic_lupa.svg';
import CajaTexto from '../com/CajaTexto';

const FormBuscar = ({ formProps }) => {
    return (
        <form {...formProps} className={s.contenedor} >
            <CajaTexto texto='Buscador' propsInput={{ type: 'text' }} />
            <Boton type='submit' icono={iconoBuscar} alt='Buscar' />
        </form>
    );
};

export default FormBuscar;