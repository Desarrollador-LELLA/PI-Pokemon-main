import React from 'react';
import s from '../../css/boton.module.css'

const Boton = ({ type, onClick, texto, icono, alt, focus }) => {
    return (
        <button className={`${s.contenedor}${focus ? ' ' + s.focus : ''}`} type={type} onClick={onClick}>
            { (icono && alt) && <img src={icono} alt={alt} width='22px' height='22px'/>}
            {texto && <span>{texto}</span>}
        </button>
    );
};

export default Boton;