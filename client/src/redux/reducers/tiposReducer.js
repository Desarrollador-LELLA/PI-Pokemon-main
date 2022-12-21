import {
  LISTAR_TIPOS,
  SET_ERROR_TIPOS,
  SET_LOADING_TIPOS,
} from '../types/index';

const initialState = {
  listTipos: [],
  errorTipos: '',
  loadingTipos: false,
};

const tiposReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTAR_TIPOS:
      return {
        ...state,
        listTipos: action.payload,
      };
    case SET_ERROR_TIPOS:
      return {
        ...state,
        errorTipos: action.payload,
      };
    case SET_LOADING_TIPOS:
      return {
        ...state,
        loadingTipos: action.payload,
      };
    default:
      return state;
  }
};

export default tiposReducer;
