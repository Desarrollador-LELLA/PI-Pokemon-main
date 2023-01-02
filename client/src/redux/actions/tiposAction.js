import {
  LISTAR_TIPOS,
  SET_ERROR_TIPOS,
  SET_LOADING_TIPOS,
} from '../types/index';

//http://localhost:3001/tipos

export const getListTipos = () => async (dispatch) => {
  await fetch('https://pi-pokemon-main-production-82f7.up.railway.app/tipos')
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: LISTAR_TIPOS, payload: data.result });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERROR_TIPOS,
        payload: err.message,
      });
    });
    
  dispatch({ type: SET_LOADING_TIPOS, payload: false });
};

export const setErrorTipos = (valor) => {
  return {
    type: SET_ERROR_TIPOS,
    payload: valor,
  };
};

export const setLoadingTipos = (valor) => {
  return {
    type: SET_LOADING_TIPOS,
    payload: valor,
  };
};
