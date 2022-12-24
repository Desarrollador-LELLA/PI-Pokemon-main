import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import s from '../../css/layout.module.css';
import FormBuscar from '../com/FormBuscar';

const Layout = () => {

    const { mensaje } = useSelector(state => state.mensajes)

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
                    <p className={s.botonhome}>
                        <Link to='/pokemons'>
                            Home
                        </Link>
                    </p>
                    <p className={s.botoncrear}>
                        <Link to='crear'>
                            Crear
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Layout;