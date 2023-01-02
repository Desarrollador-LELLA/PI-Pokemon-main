import React, { useEffect } from 'react';
import { getListPokemons, setLoadingPokemons, setErrorPokemons, setPaginaPokemons } from '../../redux/actions/pokemonsAction';
import { useDispatch, useSelector } from 'react-redux';
import CardPokemon from '../com/CardPokemon';
import s from '../../css/home.module.css';
import FiltroTipos from '../com/FiltroTipos';
import Boton from '../com/Boton';
import iconoAnterior from '../imagenes/ic_anterior.svg';
import iconoSiguiente from '../imagenes/ic_siguiente.svg';
import iconoMenu from '../imagenes/ic_menu.svg';
import iconoX from '../imagenes/ic_x.svg';
import { filtrarPokemons, paginacion } from '../../lib/libreria';
import Loading from '../com/Loading';
import SinResultados from '../com/SinResultados';
import { setMensajes } from '../../redux/actions/mensajesAction';
import { useState } from 'react';

const Home = () => {
    const dispatch = useDispatch();
    const [abierto, setAbierto] = useState(false);
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
        dispatch(setMensajes('Bienvenido Al Home'));
        dispatch(setLoadingPokemons(true));
        dispatch(getListPokemons());
    }, [dispatch]);

    const cambiarPagina = (e) => {
        const nom = e.target.innerText;
        dispatch(setPaginaPokemons(parseInt(nom)));
    };

    const anterior = () => {
        if (pagSelec - 1 < 1) return;
        dispatch(setPaginaPokemons(pagSelec - 1));
    };

    const siguiente = () => {
        if (pagSelec + 1 > cantPaginas) return;
        dispatch(setPaginaPokemons(pagSelec + 1));
    };

    const onClickMenuAbrir = () => {
        if (abierto) {
            setAbierto(false);
        } else {
            setAbierto(true);
        }
    };

    return (
        <>
            <div className={s.contenedorhome}>
                <input className={s.clasecheck} type="checkbox" id={s.check} />
                <div className={s.contenedorboton}>
                    <label htmlFor={s.check} className="checkbtn" onClick={onClickMenuAbrir}>
                        <img src={abierto ? iconoX : iconoMenu} alt='Menu' width='30px' />
                    </label>
                </div>
                <div className={s.contenedormenu}>
                    <FiltroTipos />
                </div>
                <div className={s.contenedorcards}>
                    {loadingPokemons ? <Loading /> :
                        listaFiltrada.length ?
                            listaFiltrada.slice(inicio, fin).map(x => {
                                return <CardPokemon key={x.id} nombre={x.nombre} imagen={x.imagen} tipos={x.tipos} id={x.id} col={s.col} />;
                            })
                            : <SinResultados />
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