import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import s from '../../css/layout.module.css';
import Boton from '../com/Boton';
import FormBuscar from '../com/FormBuscar';
import logo from '../imagenes/ic_logo.png';
import icHome from '../imagenes/ic_home.svg';
import icAdd from '../imagenes/ic_add.svg';
import icLanding from '../imagenes/ic_landing.svg';
import { useState } from 'react';

const initialState = {
    home: { name: 'Home', url: '/pokemons', activo: true },
    create: { name: 'Crear Pokemon', url: '/pokemons/crear', activo: false },
    power: { name: 'Landing', url: '/', activo: true }
};

const Layout = () => {

    const navegar = useNavigate();
    const [navegacion, setNavegacion] = useState(initialState);
    const { mensaje } = useSelector(state => state.mensajes);

    const nav = (e) => {
        setNavegacion({ ...navegacion, home: { ...navegacion.home, activo: true }, create: { ...navegacion.create, activo: false } })
        navegar(navegacion.home.url);
    };

    const navc = (e) => {
        setNavegacion({ ...navegacion, home: { ...navegacion.home, activo: false }, create: { ...navegacion.create, activo: true } })
        navegar(navegacion.create.url);
    };

    const navd = (e) => {
        navegar(navegacion.power.url);
    };

    return (
        <div className={s.contenedor}>
            <div className={s.header}>
                <div className={s.primeraheader}>
                    <div className={s.bordecirculo}>
                        <div className={s.circulo}></div>
                    </div>
                    <div className={s.colorred}></div>
                    <div className={s.coloramarillo}></div>
                    <div className={s.colorverde}></div>
                    <img className={s.logo} src={logo} alt='Logo' width='95px' height='35px' />
                </div>

                <div className={s.segundaheader}>
                    <FormBuscar />
                </div>
            </div>
            <div className={s.pantallamensajes}>
                <div>
                    {mensaje}
                </div>
            </div>
            <div className={s.contenedorhijo}>
                <div className={s.pantallaborde}>
                    <div className={s.pantalla}>
                        <Outlet />
                    </div>
                </div>
                <div className={s.pie}>
                    <div className={s.contboton}>
                        <Boton texto={'Home'} type='button' icono={icHome} alt='Home' onClick={nav} focus={navegacion.home.activo} />
                    </div>
                    <div className={s.contboton}>
                        <Boton texto={'Crear Pokemon'} type='button' icono={icAdd} alt='Crear' onClick={navc} focus={navegacion.create.activo} />
                    </div>
                    <div className={s.contbotonoff}>
                        <Boton type='button' icono={icLanding} alt='Apagar' onClick={navd} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;