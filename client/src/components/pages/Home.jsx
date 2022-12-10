import React, { useEffect } from 'react';
import { getListPokemons, setLoadingPokemons, setErrorPokemons } from '../../redux/actions/pokemonsAction';
import { useDispatch, useSelector } from 'react-redux';
import CardPokemon from '../com/CardPokemon';
import s from '../../css/home.module.css'

const Home = () => {
    const dispatch = useDispatch();
    const { error, loading, listPokemons } = useSelector(state => state.pokemons);

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setErrorPokemons(''));
            }
        };
    }, [error, dispatch]);

    useEffect(() => {
        listarPokemons();
    }, []);

    const listarPokemons = () => {
        dispatch(setLoadingPokemons(true));
        dispatch(getListPokemons());
    };

    if (loading) {
        return <div>Cargando</div>;
    }
    return (
        <div className={s.contenedorcards}>
            {
                listPokemons.map(x => <CardPokemon nombre={x.nombre} imagen={x.imagen} tipos={x.tipos} key={x.id} />)
            }
        </div>
    );
};

export default Home;