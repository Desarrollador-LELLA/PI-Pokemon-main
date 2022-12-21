import React from 'react';
import s from '../../css/checkbox.module.css';

const CheckBox = ({ texto, gatillo, estado, propsDivCont }) => {
    return (
        <div className={estado ? gatillo ? s.contenedorsin : s.contenedor : s.contenedordisable} {...propsDivCont}>
            {/* <input type='checkbox' {...propsCheck}/> */}
            <div>{texto}</div>
        </div>
    );
};

export default CheckBox;