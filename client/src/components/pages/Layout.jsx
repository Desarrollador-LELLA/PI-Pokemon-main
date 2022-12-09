import React from 'react';
import { Outlet } from 'react-router-dom';
import s from '../../css/layout.module.css';

const Layout = () => {
    return (
        <div className={s.contenedor}>
            <div className={s.header}>
                <div className={s.bordecirculo}>
                    <div className={s.circulo}></div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Layout;