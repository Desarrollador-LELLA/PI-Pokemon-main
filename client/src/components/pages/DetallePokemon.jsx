import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBuscarPokemonId, setErrorPokemons, setLoadingPokemons, setBuscarPokemon } from '../../redux/actions/pokemonsAction';
import Detalle from '../com/Detalle';
import Loading from '../com/Loading';
import SinResultados from '../com/SinResultados';
import s from '../../css/detallepokemon.module.css';

const DetallePokemon = () => {

    const { buscarPokermon, loadingPokemons, errorPokemons } = useSelector(state => state.pokemons);
    const { id } = useParams();
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
        dispatch(getBuscarPokemonId(id));
        return () =>{
            if (buscarPokermon) {
                dispatch(setBuscarPokemon());
            }
        }
    }, [dispatch, id]);

    return (
        <div className={s.contenedordetallepoke}>
            {
                loadingPokemons ?
                    <Loading /> :
                    buscarPokermon.confirmation ?
                        <Detalle detalle={buscarPokermon.result}/>
                        : <SinResultados />
            }

        </div>
    );
};

export default DetallePokemon;