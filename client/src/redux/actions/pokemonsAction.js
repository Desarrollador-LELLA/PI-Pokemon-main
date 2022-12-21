import { pokemons } from '../../lib/dbTester';
import axios from "axios";
import {
  LISTAR_POKEMONS,
  SET_FILTRADO_POKEMONS,
  SET_ERROR_POKEMONS,
  SET_LOADING_POKEMONS,
  ADD_TIPO_FILTRADO_POKEMONS,
  DEL_TIPO_FILTRADO_POKEMONS,
  UNICA_TIPO_FILTRADO_POKEMONS,
  SET_PAGINA_POKEMONS,
} from '../types/index';

export const getListPokemons = () => async (dispatch) => {
  //let success = await axios.get("http://localhost:3001/pokemons",{});
  let success = await pokemons;
  // await fetch('http://localhost:3001/pokemons')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     success = data.success;
  //     //dispatch({ type: LISTAR_POKEMONS, payload: data.success });
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: SET_ERROR_POKEMONS,
  //       payload: err.message,
  //     });
  //   });
  //dispatch({ type: SET_LOADING_POKEMONS, payload: false });
  //return dispatch({ type: LISTAR_POKEMONS, payload: success.data.success });
  return dispatch({ type: LISTAR_POKEMONS, payload: success.success });
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

export const setFiltradoPokemons = (valor) => {
  return {
    type: SET_FILTRADO_POKEMONS,
    payload: valor,
  };
};

export const addTipoFiltradoPokemons = (valor) => {
  return {
    type: ADD_TIPO_FILTRADO_POKEMONS,
    payload: valor,
  };
};

export const delTipoFiltradoPokemons = (valor) => {
  return {
    type: DEL_TIPO_FILTRADO_POKEMONS,
    payload: valor,
  };
};

export const unicaTipoFiltradoPokemons = (valor) => {
  return {
    type: UNICA_TIPO_FILTRADO_POKEMONS,
    payload: valor,
  };
};

export const setPaginaPokemons = (valor) => {
  return {
    type: SET_PAGINA_POKEMONS,
    payload: valor,
  };
};
