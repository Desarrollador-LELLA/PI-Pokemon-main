import React from 'react';
import s from '../../css/cajatexto.module.css';

const CajaTexto = ({ propsInput, propsLabel, texto }) => {
    return (
        <div className={s.contenedor}>
            <label {...propsLabel}>{texto}</label>
            <input {...propsInput} />
        </div>
    );
};

export default CajaTexto;