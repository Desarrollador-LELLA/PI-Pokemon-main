import React from 'react';
import s from '../../css/ordenarpor.module.css';
import CheckBox from './CheckBox';
import { useSelector, useDispatch } from 'react-redux';
import { setFiltradoPokemons, setPaginaPokemons } from '../../redux/actions/pokemonsAction';

const OrdenarPor = () => {

    const { filtrado } = useSelector(state => state.pokemons);
    const dispatch = useDispatch();

    const onClickDivSinOrden = () => {
        if (filtrado.opSinOrden) return;
        dispatch(setPaginaPokemons(1))
        dispatch(setFiltradoPokemons({ opSinOrden: true, opDesc: false, opAsce: false, opAZ: false, opZA: false }));
    };

    const onClickDivDesc = () => {
        dispatch(setPaginaPokemons(1))
        if (filtrado.opDesc) {
            onClickDivSinOrden();
        } else {
            dispatch(setFiltradoPokemons({ opSinOrden: false, opDesc: true, opAsce: false, opAZ: false, opZA: false }));
        }
    };

    const onClickDivAsce = () => {
        dispatch(setPaginaPokemons(1))
        if (filtrado.opAsce) {
            onClickDivSinOrden();
        } else {
            dispatch(setFiltradoPokemons({ opSinOrden: false, opDesc: false, opAsce: true, opAZ: false, opZA: false }));
        }
    };

    const onClickDivAZ = () => {
        dispatch(setPaginaPokemons(1))
        if (filtrado.opAZ) {
            onClickDivSinOrden();
        } else {
            dispatch(setFiltradoPokemons({ opSinOrden: false, opDesc: false, opAsce: false, opAZ: true, opZA: false }));
        }
    };

    const onClickDivZA = () => {
        dispatch(setPaginaPokemons(1))
        if (filtrado.opZA) {
            onClickDivSinOrden();
        } else {
            dispatch(setFiltradoPokemons({ opSinOrden: false, opDesc: false, opAsce: false, opAZ: false, opZA: true }));
        }
    };

    return (
        <>
            <span>Ordenar Por:</span>
            <div className={s.contenedoropciones}>
                <div>
                    <CheckBox texto={'Sin Orden'} gatillo={filtrado.opSinOrden} estado={true} propsDivCont={{ onClick: onClickDivSinOrden }} />
                </div>
                <div className={s.contenedorcheck}>
                    <CheckBox texto={'▽-Desc.'} gatillo={filtrado.opDesc} estado={true} propsDivCont={{ onClick: onClickDivDesc }} />
                </div>
                <div className={s.contenedorcheck}>
                    <CheckBox texto={'△-Asce.'} gatillo={filtrado.opAsce} estado={true} propsDivCont={{ onClick: onClickDivAsce }} />
                </div>
                <div className={s.contenedorcheck}>
                    <CheckBox texto={'A - Z'} gatillo={filtrado.opAZ} estado={true} propsDivCont={{ onClick: onClickDivAZ }} />
                </div>
                <div className={s.contenedorcheck}>
                    <CheckBox texto={'Z - A'} gatillo={filtrado.opZA} estado={true} propsDivCont={{ onClick: onClickDivZA }} />
                </div>
            </div>
        </>
    );
};

export default OrdenarPor;