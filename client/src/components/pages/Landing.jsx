import React from 'react';
import { Link } from 'react-router-dom';
import s from '../../css/landing.module.css';
import logo from '../imagenes/ic_logo.png'
import { useNavigate } from 'react-router-dom';

const Landing = () => {

    const navegar = useNavigate();

    const onClick = () => {
        navegar('/pokemons')
    }

    return (
        <div className={s.contenedor}>
            <div className={s.bolasuperior}>
                <img src={logo} alt='Pokedex' />
            </div>
            <div className={s.contenedorcorte}>

            </div>
            <div className={s.bolainferior}>

            </div>
            <div className={s.contenedorcirculote}>

                <div className={s.circulote}>
                    <div className={s.ingreso} onClick={onClick}>
                        <span>Entrar</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;