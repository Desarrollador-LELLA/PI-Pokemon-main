import {
  LISTAR_POKEMONS,
  SET_ERROR_POKEMONS,
  SET_LOADING_POKEMONS,
  SET_FILTRADO_POKEMONS,
  ADD_TIPO_FILTRADO_POKEMONS,
  DEL_TIPO_FILTRADO_POKEMONS,
  UNICA_TIPO_FILTRADO_POKEMONS,
  SET_PAGINA_POKEMONS,
  GET_BUSCAR_POKEMON,
  SET_BUSCAR_POKEMON,
} from '../types/index';

const initialState = {
  listPokemons: [],
  buscarPokermon: {},
  filtrado: {
    oddCreados: true,
    oddApi: true,
    opSinOrden: true,
    opDesc: false,
    opAsce: false,
    opAZ: false,
    opZA: false,
    fptTipos: [],
    optTodos: true,
    optSeleUni: false,
    optSeleMult: false,
    optSeleMultEx: false,
  },
  pagSelec: 1,
  errorPokemons: '',
  loadingPokemons: false,
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
        errorPokemons: action.payload,
      };
    case SET_LOADING_POKEMONS:
      return {
        ...state,
        loadingPokemons: action.payload,
      };
    case SET_FILTRADO_POKEMONS:
      return {
        ...state,
        filtrado: { ...state.filtrado, ...action.payload },
      };
    case ADD_TIPO_FILTRADO_POKEMONS:
      return {
        ...state,
        filtrado: {
          ...state.filtrado,
          fptTipos: [...state.filtrado.fptTipos, action.payload],
        },
      };
    case DEL_TIPO_FILTRADO_POKEMONS:
      const nuevaElimnado = state.filtrado.fptTipos.filter(
        (x) => x !== action.payload
      );
      return {
        ...state,
        filtrado: { ...state.filtrado, fptTipos: nuevaElimnado },
      };
    case UNICA_TIPO_FILTRADO_POKEMONS:
      return {
        ...state,
        filtrado: {
          ...state.filtrado,
          fptTipos: [action.payload],
        },
      };
    case SET_PAGINA_POKEMONS:
      return {
        ...state,
        pagSelec: action.payload,
      };
    case SET_BUSCAR_POKEMON:
    case GET_BUSCAR_POKEMON:
      return {
        ...state,
        buscarPokermon: action.payload,
      };
    default:
      return state;
  }
};

export default pokemonsReducer;
