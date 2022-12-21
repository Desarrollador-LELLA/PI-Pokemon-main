import React, { useEffect } from 'react';
import { getListTipos, setErrorTipos, setLoadingTipos } from '../../redux/actions/tiposAction';
import { useDispatch, useSelector } from 'react-redux';
import s from '../../css/selecciontipos.module.css';
import CheckBox from './CheckBox';
import { setFiltradoPokemons, addTipoFiltradoPokemons, delTipoFiltradoPokemons, unicaTipoFiltradoPokemons, setPaginaPokemons } from '../../redux/actions/pokemonsAction';

const SeleccionTipos = () => {

    const dispatch = useDispatch();
    const { errorTipos, loadingTipos, listTipos } = useSelector(state => state.tipos);
    const { filtrado } = useSelector(state => state.pokemons);

    useEffect(() => {
        return () => {
            if (errorTipos) {
                dispatch(setErrorTipos(''));
            }
        };
    }, [errorTipos, dispatch]);

    useEffect(() => {
        dispatch(setLoadingTipos(true));
        dispatch(getListTipos());
    }, [dispatch]);

    const onClickDivTodos = (e) => {
        if (filtrado.optTodos) return;
        dispatch(setPaginaPokemons(1))
        dispatch(setFiltradoPokemons({ fptTipos: [], optTodos: true, optSeleUni: false, optSeleMult: false, optSeleMultEx: false }));
    };

    const onClickDivSeleccionUnica = (e) => {
        if (filtrado.optSeleUni) return;
        dispatch(setPaginaPokemons(1))
        dispatch(setFiltradoPokemons({ fptTipos: [], optTodos: false, optSeleUni: true, optSeleMult: false, optSeleMultEx: false }));
    };

    const onClickDivSeleccionMultiple = (e) => {
        if (filtrado.optSeleMult) return;
        dispatch(setPaginaPokemons(1))
        dispatch(setFiltradoPokemons({ fptTipos: [], optTodos: false, optSeleUni: false, optSeleMult: true, optSeleMultEx: false }));
    };

    const onClickDivSeleccionMultipleExact = (e) => {
        if (filtrado.optSeleMultEx) return;
        dispatch(setPaginaPokemons(1))
        dispatch(setFiltradoPokemons({ fptTipos: [], optTodos: false, optSeleUni: false, optSeleMult: false, optSeleMultEx: true }));
    };

    const onClickDivTipos = (e) => {
        const nom = e.target.innerText;
        dispatch(setPaginaPokemons(1))
        if (filtrado.optSeleUni) {
            if (!filtrado.fptTipos.includes(nom)) {
                dispatch(unicaTipoFiltradoPokemons(nom));
            } else {
                dispatch(delTipoFiltradoPokemons(nom));
            }
        } else if (filtrado.optSeleMult || filtrado.optSeleMultEx) {
            if (filtrado.fptTipos.includes(nom)) {
                dispatch(delTipoFiltradoPokemons(nom));
            } else {
                dispatch(addTipoFiltradoPokemons(nom));
            }
        }
    };

    return (
        <>
            <span>Filtrar Por Tipos</span>
            <div className={s.contenedoropciones}>
                <div>
                    <CheckBox texto={'Todos'} gatillo={filtrado.optTodos} estado={true} propsDivCont={{ onClick: onClickDivTodos }} />
                </div>
                <div>
                    <CheckBox texto={'Seleccion Unica'} gatillo={filtrado.optSeleUni} estado={true} propsDivCont={{ onClick: onClickDivSeleccionUnica }} />
                </div>
                <div>
                    <CheckBox texto={'Seleccion Multiple'} gatillo={filtrado.optSeleMult} estado={true} propsDivCont={{ onClick: onClickDivSeleccionMultiple }} />
                </div>
                <div>
                    <CheckBox texto={'Seleccion Multiple Exacta'} gatillo={filtrado.optSeleMultEx} estado={true} propsDivCont={{ onClick: onClickDivSeleccionMultipleExact }} />
                </div>
                {loadingTipos ? <div>Cargando</div> :
                    listTipos.map(x => <div className={s.contenedorcheck} key={x.id} >
                        <CheckBox texto={x.nombre} gatillo={filtrado.fptTipos.includes(x.nombre)} estado={!filtrado.optTodos} propsDivCont={{ onClick: onClickDivTipos }} />
                    </div>)
                }
            </div>
        </>
    );
};

export default SeleccionTipos;