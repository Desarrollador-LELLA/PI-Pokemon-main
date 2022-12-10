import {
  LISTAR_POKEMONS,
  SET_ERROR_POKEMONS,
  SET_LOADING_POKEMONS,
} from '../types/index';

export const getListPokemons = () => async (dispatch) => {
  await fetch('http://localhost:3001/pokemons')
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: LISTAR_POKEMONS, payload: data.success });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR_POKEMONS,
        payload: err.message,
      });
    });

  dispatch({ type: SET_LOADING_POKEMONS, payload: false });
};

export const setErrorPokemons = (valor) => {
  return {
    type: SET_ERROR_POKEMONS,
    payload: valor,
  };
};

export const setLoadingPokemons = (valor) => {
  return {
    type: SET_LOADING_POKEMONS,
    payload: valor,
  };
};
