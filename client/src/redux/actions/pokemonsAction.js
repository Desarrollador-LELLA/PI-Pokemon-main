// import { pokemons } from '../../lib/dbTester';
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
  GET_BUSCAR_POKEMON_ID,
} from '../types/index';

const urlA = 'http://localhost:3001/pokemons';

export const getListPokemons = () => async (dispatch) => {
  // const dis = await pokemons.success
  //https://pi-pokemon-main-production-82f7.up.railway.app/pokemons
  //http://localhost:3001/pokemons
  const dis = await fetch(urlA)
    .then((res) => res.json())
    .then((data) => {
      return { type: LISTAR_POKEMONS, payload: data.result };
    })
    .catch((err) => {
      return {
        type: SET_ERROR_POKEMONS,
        payload: err.message,
      };
    });
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

export const getBuscarPokemon = (nombre) => async (dispatch) => {
  const dis = await fetch(`${urlA}?nombre=${nombre}`)
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: SET_MENSAJES, payload: data.message });
      return { type: GET_BUSCAR_POKEMON, payload: data };
    })
    .catch((err) => {
      return {
        type: SET_ERROR_POKEMONS,
        payload: err.message,
      };
    });
  dispatch(dis);
  dispatch({ type: SET_LOADING_POKEMONS, payload: false });
};

export const getBuscarPokemonId = (id) => async (dispatch) => {
  const dis = await fetch(`${urlA}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: SET_MENSAJES, payload: data.message });
      return { type: GET_BUSCAR_POKEMON_ID, payload: data };
  })
    .catch((err) => {
    return {
      type: SET_ERROR_POKEMONS,
        payload: err.message,
      };
    });
  dispatch(dis);
  dispatch({ type: SET_LOADING_POKEMONS, payload: false });
};

export const createPokemon = ({ nombre, altura, peso, vida, defenza, ataque, velocidad, imagen, tipos }) =>
  async (dispatch) => {
    // fetch(url, {
    //   method: 'POST', // or 'PUT'
    //   body: JSON.stringify(data), // data can be `string` or {object}!
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    const dis = await fetch(urlA, {
      method: 'POST',
      body: JSON.stringify({ nombre, altura, peso, vida, defenza, ataque, velocidad, imagen, tipos, }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: SET_MENSAJES, payload: data.message });
        return { type: SET_BUSCAR_POKEMON, payload: data };
      })
      .catch((err) => {
        return {
          type: SET_ERROR_POKEMONS,
          payload: err.message,
        };
      });
    dispatch(dis);
    dispatch({ type: SET_LOADING_POKEMONS, payload: false });
  };

export const setBuscarPokemon = () => {
  return {
    type: SET_BUSCAR_POKEMON,
    payload: {},
  };
};

export const deletePokemon = (id) =>
  async (dispatch) => {
    const dis = await fetch(`${urlA}/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: SET_MENSAJES, payload: data.message });
        if(data.confirmation){
          dispatch({ type: LISTAR_POKEMONS, payload: data.result })
        }
        return { type: SET_BUSCAR_POKEMON, payload: data };
      })
      .catch((err) => {
        return {
          type: SET_ERROR_POKEMONS,
          payload: err.message,
        };
      });
    dispatch(dis);
    dispatch({ type: SET_LOADING_POKEMONS, payload: false });
  };