import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <h1>Landing</h1>
            <h2>Bienvenido <Link to='/pokemons'>
                Pincha Aqui
            </Link> para Entrar</h2>
        </div>
    );
};

export default Landing;