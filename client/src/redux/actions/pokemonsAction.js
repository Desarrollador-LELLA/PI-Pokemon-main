//import { pokemons } from '../../lib/dbTester';
import {
  LISTAR_POKEMONS,
  SET_FILTRADO_POKEMONS,
  SET_ERROR_POKEMONS,
  SET_LOADING_POKEMONS,
  ADD_TIPO_FILTRADO_POKEMONS,
  DEL_TIPO_FILTRADO_POKEMONS,
  UNICA_TIPO_FILTRADO_POKEMONS,
  SET_PAGINA_POKEMONS,
  GET_BUSCAR_POKEMON,
  SET_BUSCAR_POKEMON,
  SET_MENSAJES,
} from '../types/index';

export const getListPokemons = () => async (dispatch) => {
  //ENCONTRAR SOLUCION PORQUE EN DISPOSITIVOS MOVILES CON NAVEGADORES NO RENDERISA LAS CONSULTAS PERO SI EN NAVEGADORES DE WINDOWS. BUSCAR POSIBLES SOLUCIONES
  //SE REALIZO UN TESTER GENERAL A LA LINEA COMPLETA DESDE QUE SE CONSULTA A LA API LLEGANDO A LA CONCLUCION QUE ESTO OCURRE DESDE CUANDO USAMOS EL FETCH ES
  //EN ESTE PUNTO EN DONDE TENEMOS QUE REALIZAR PRUEBAS PARA INVESTIGAR.

  const dis = await fetch('http://localhost:3001/pokemons')
    .then((res) => res.json())
    .then((data) => {
      return { type: LISTAR_POKEMONS, payload: data.success };
    })
    .catch((err) => {
      return {
        type: SET_ERROR_POKEMONS,
        payload: err.message,
      };
    });
  //const dis = { type: LISTAR_POKEMONS, payload: pokemons.success }
  dispatch(dis);
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

export const getBuscarPokemon = (valor) => async (dispatch) => {
  const dis = await fetch(`http://localhost:3001/pokemons?nombre=${valor}`)
    .then((res) => res.json())
    .then((data) => {
      return { type: GET_BUSCAR_POKEMON, payload: data };
    })
    .catch((err) => {
      return {
        type: SET_ERROR_POKEMONS,
        payload: err.message,
      };
    });
  if (dis.payload.error) {
    dispatch({ type: SET_MENSAJES, payload: dis.payload.error });
  }
  dispatch(dis);
  dispatch({ type: SET_LOADING_POKEMONS, payload: false });
};

export const setBuscarPokemon = () => {
  return {
    type: SET_BUSCAR_POKEMON,
    payload: {},
  };
};
