import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from '../../css/origendatos.module.css';
import { setFiltradoPokemons, setPaginaPokemons } from '../../redux/actions/pokemonsAction';
import CheckBox from './CheckBox';

const OrigenDatos = () => {

    const { filtrado } = useSelector(state => state.pokemons);
    const dispatch = useDispatch();

    const onClickDivCreados = (e) => {
        dispatch(setPaginaPokemons(1))
        if (filtrado.oddApi) {
            dispatch(setFiltradoPokemons({ oddCreados: !filtrado.oddCreados, oddApi: true }));
        } else {
            dispatch(setFiltradoPokemons({ oddCreados: !filtrado.oddCreados, oddApi: !filtrado.oddApi }));
        }
    };

    const onClickDivApi = (e) => {
        dispatch(setPaginaPokemons(1))
        if (filtrado.oddCreados) {
            dispatch(setFiltradoPokemons({ oddCreados: true, oddApi: !filtrado.oddApi }));
        } else {
            dispatch(setFiltradoPokemons({ oddCreados: !filtrado.oddCreados, oddApi: !filtrado.oddApi }));
        }
    };

    return (
        <>
            <span>Origen de Datos:</span>
            <div className={s.contenedoropciones}>
                <div className={s.contenedorcheck}>
                    <CheckBox texto={'Creados'} gatillo={filtrado.oddCreados} estado={true} propsDivCont={{ onClick: onClickDivCreados }} />
                </div>
                <div className={s.contenedorcheck}>
                    <CheckBox texto={'API'} gatillo={filtrado.oddApi} estado={true} propsDivCont={{ onClick: onClickDivApi }} />
                </div>
            </div>
        </>
    );
};

export default OrigenDatos;