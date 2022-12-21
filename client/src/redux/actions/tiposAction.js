import {
  LISTAR_TIPOS,
  SET_ERROR_TIPOS,
  SET_LOADING_TIPOS,
} from '../types/index';

export const getListTipos = () => async (dispatch) => {
  await fetch('http://localhost:3001/tipos')
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: LISTAR_TIPOS, payload: data.success });
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
