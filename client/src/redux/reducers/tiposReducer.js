import { LISTAR_TIPOS } from '../types/index';

const initialState = {
  listTipos: [],
  error: '',
  loading: false,
};

const tiposReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTAR_TIPOS:
      return {
        ...state,
        listTipos: action.payload,
      };
    default:
      return state;
  }
};

export default tiposReducer;