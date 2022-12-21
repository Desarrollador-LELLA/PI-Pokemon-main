import React from 'react';
import CardPokemon from '../com/CardPokemon';
import s from '../../css/home.module.css';

const CreaPokemon = () => {
    return (
        <div className={s.contenedorhome}>
            <div className={s.contenedormenu}>
                algo
            </div>
            <div className={s.contenedorcards}>
                <h1>Crear Pokemons</h1>
                <CardPokemon nombre={'x.nombre'} tipos={['uno', 'dos']} />
                <CardPokemon nombre={'x.nombre'} tipos={['uno', 'dos']} />
                <CardPokemon nombre={'x.nombre'} tipos={['uno', 'dos']} />
                <CardPokemon nombre={'x.nombre'} tipos={['uno', 'dos']} />
                <CardPokemon nombre={'x.nombre'} tipos={['uno', 'dos']} />
                <CardPokemon nombre={'x.nombre'} tipos={['uno', 'dos']} />
                <CardPokemon nombre={'x.nombre'} tipos={['uno', 'dos']} />
            </div>
        </div>
    );
};

export default CreaPokemon;