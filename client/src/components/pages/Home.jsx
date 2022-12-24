import React, { useEffect } from 'react';
import { getListPokemons, setLoadingPokemons, setErrorPokemons, setPaginaPokemons } from '../../redux/actions/pokemonsAction';
import { useDispatch, useSelector } from 'react-redux';
import CardPokemon from '../com/CardPokemon';
import s from '../../css/home.module.css';
import FiltroTipos from '../com/FiltroTipos';
import Boton from '../com/Boton';
import iconoAnterior from '../imagenes/ic_anterior.svg';
import iconoSiguiente from '../imagenes/ic_siguiente.svg';
import { filtrarPokemons, paginacion } from '../../lib/libreria';

const Home = () => {
    const dispatch = useDispatch();
    const { listPokemons, errorPokemons, loadingPokemons, filtrado, pagSelec } = useSelector(state => state.pokemons);
    const listaFiltrada = filtrarPokemons(filtrado, listPokemons);
    const { paginasBar, inicio, fin, cantPaginas } = paginacion(listaFiltrada.length, pagSelec);

    useEffect(() => {
        return () => {
            if (errorPokemons) {
                dispatch(setErrorPokemons(''));
            }
        };
    }, [errorPokemons, dispatch]);

    useEffect(() => {
        dispatch(setLoadingPokemons(true));
        dispatch(getListPokemons());
        //dispatch(setLoadingPokemons(false));
    }, [dispatch]);

    const cambiarPagina = (e) => {
        const nom = e.target.innerText;
        dispatch(setPaginaPokemons(parseInt(nom)))
    }

    const anterior = () => {
        if(pagSelec - 1 < 1) return;
        dispatch(setPaginaPokemons(pagSelec - 1))
    }

    const siguiente = () => {
        if(pagSelec + 1 > cantPaginas) return;
        dispatch(setPaginaPokemons(pagSelec + 1))
    }

    return (
        <>
            <div className={s.contenedorhome}>
                <div className={s.contenedormenu}>
                    <FiltroTipos />
                </div>
                <div className={s.contenedorcards}>
                    {loadingPokemons ? <div>Cargando</div> :
                        listaFiltrada.slice(inicio, fin).map(x => {
                            return <CardPokemon key={x.id} nombre={x.nombre} imagen={x.imagen} tipos={x.tipos} />;
                        })
                        // listPokemons.map(x => (
                        //     //alert(x.nombre)
                        //     <CardPokemon key={x.id} nombre={x.nombre} imagen={x.imagen} tipos={x.tipos} />
                        // ))
                    }
                </div>
            </div>
            <div className={s.contenedorpaginas}>
                <div className={s.paginas}>
                    <Boton icono={iconoAnterior} alt='Anterior' onClick={anterior} />
                    <Boton texto={paginasBar[0]} onClick={cambiarPagina} focus={paginasBar[0] === pagSelec ? true : false} />
                    {paginasBar[1] && <div>...</div>}
                    {paginasBar[2] && <Boton texto={paginasBar[2]} onClick={cambiarPagina} focus={paginasBar[2] === pagSelec ? true : false} />}
                    {paginasBar[3] && <Boton texto={paginasBar[3]} onClick={cambiarPagina} focus={paginasBar[3] === pagSelec ? true : false} />}
                    {paginasBar[4] && <Boton texto={paginasBar[4]} onClick={cambiarPagina} focus={paginasBar[4] === pagSelec ? true : false} />}
                    {paginasBar[5] && <div>...</div>}
                    {paginasBar[6] && <Boton texto={paginasBar[6]} onClick={cambiarPagina} focus={paginasBar[6] === pagSelec ? true : false} />}
                    <Boton icono={iconoSiguiente} alt='Siguiente' onClick={siguiente} />
                </div>
            </div>
        </>
    );
};

export default Home;