import React from 'react';
import pikachu from '../imagenes/pikachu.png'
import s from '../../css/paginano.module.css'
import Boton from '../com/Boton';
import iconoHome from '../imagenes/ic_home.svg'
import { useNavigate } from 'react-router-dom';

const PaginaNoFount = () => {

    const navegar = useNavigate()

    return (
        <div className={s.contenedor}>
            <span className={s.contenedorspan}>Pagina No Encontrada Error 404</span>
            <img src={pikachu} alt='Pikachu' width='250px'/>
            <Boton icono={iconoHome} alt='Home' texto='Ir al Landing' onClick={() => { navegar('/') }} />
        </div>
    );
};

export default PaginaNoFount;