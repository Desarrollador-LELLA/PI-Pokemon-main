import React from 'react';
import s from '../../css/cajatexto.module.css';

const CajaTexto = ({ propsInput, propsLabel, texto, textVal }) => {
    return (
        <div className={s.contenedor}>
            {textVal && <span className={s.toolTips}>{textVal}</span>}
            <label {...propsLabel}>{texto}</label>
            <input className={textVal ? s.falseinput : s.trueinput} {...propsInput} />
        </div>
    );
};

export default CajaTexto;