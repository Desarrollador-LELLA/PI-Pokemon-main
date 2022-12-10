import {
  LISTAR_POKEMONS,
  SET_ERROR_POKEMONS,
  SET_LOADING_POKEMONS,
} from '../types/index';

const initialState = {
  listPokemons: [],
  error: '',
  loading: false,
};

const pokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTAR_POKEMONS:
      return {
        ...state,
        listPokemons: action.payload,
      };
    case SET_ERROR_POKEMONS:
      return {
        ...state,
        error: action.payload,
      };
    case SET_LOADING_POKEMONS:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default pokemonsReducer;
