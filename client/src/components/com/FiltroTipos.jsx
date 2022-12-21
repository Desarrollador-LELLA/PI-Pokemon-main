import React from 'react';
import s from '../../css/filtrotipos.module.css';
import OrigenDatos from './OrigenDatos';
import OrdenarPor from './OrdenarPor';
import SeleccionTipos from './SeleccionTipos';

const FiltroTipos = () => {
    return (
        <div className={s.contenedor}>
            <OrigenDatos />
            <OrdenarPor />
            <SeleccionTipos />
        </div>
    );
};

export default FiltroTipos;