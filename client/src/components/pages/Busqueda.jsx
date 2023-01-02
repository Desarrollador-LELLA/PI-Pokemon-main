import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setBuscarPokemon, setErrorPokemons, getBuscarPokemon, setLoadingPokemons } from '../../redux/actions/pokemonsAction';
import CardPokemon from '../com/CardPokemon';
import s from '../../css/busqueda.module.css';
import SinResultados from '../com/SinResultados';
import Loading from '../com/Loading';

const Busqueda = () => {

    const { buscarPokermon, errorPokemons, loadingPokemons } = useSelector(state => state.pokemons);
    const { nombre } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (errorPokemons) {
                dispatch(setErrorPokemons(''));
            }            
        };
    }, [errorPokemons, dispatch]);

    useEffect(() => {
        dispatch(setLoadingPokemons(true));
        dispatch(getBuscarPokemon(nombre));
        return () =>{
            if (buscarPokermon) {
                dispatch(setBuscarPokemon());
            }
        }
    }, [dispatch, nombre]);

    return (
        <div className={s.contenedorcards}>
            {
                loadingPokemons ?
                    <Loading /> :
                    buscarPokermon.confirmation ?
                    <div className={s.contenedorcentro}>
                        <CardPokemon nombre={buscarPokermon.result.nombre} imagen={buscarPokermon.result.imagen} tipos={buscarPokermon.result.tipos} id={buscarPokermon.result.id} col={s.creadocards} />
                    </div>
                        : <SinResultados />
            }
        </div>
    );
};

export default Busqueda;