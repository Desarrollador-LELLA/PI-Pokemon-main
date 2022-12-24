import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setBuscarPokemon, setErrorPokemons, getBuscarPokemon/*, loadingPokemons*/ } from '../../redux/actions/pokemonsAction';
import { setMensajes } from '../../redux/actions/mensajesAction';
import CardPokemon from '../com/CardPokemon';
import s from '../../css/busqueda.module.css';
import SinResultados from '../com/SinResultados';

const Busqueda = () => {

    const { buscarPokermon, errorPokemons/*, loadingPokemons*/ } = useSelector(state => state.pokemons);
    const { mensaje } = useSelector(state => state.mensajes);
    const { nombre } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (errorPokemons) {
                dispatch(setErrorPokemons(''));
            }
            if (buscarPokermon) {
                dispatch(setBuscarPokemon());
            }
        };
    }, [errorPokemons, dispatch]);

    useEffect(() => {
        return () => {
            if (mensaje) {
                dispatch(setMensajes(''));
            }
        };
    }, [mensaje, nombre, dispatch]);

    useEffect(() => {
        dispatch(getBuscarPokemon(nombre));
    }, [dispatch, nombre]);

    return (
        <div className={s.contenedorcards}>
            {
                buscarPokermon.success ?
                    <CardPokemon nombre={buscarPokermon.success.nombre} imagen={buscarPokermon.success.imagen} tipos={buscarPokermon.success.tipos} />
                    : <SinResultados />
            }
        </div>
    );
};

export default Busqueda;