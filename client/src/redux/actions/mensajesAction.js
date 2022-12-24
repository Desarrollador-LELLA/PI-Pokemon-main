import { SET_MENSAJES } from '../types/index';

export const setMensajes = (valor) => {
  return {
    type: SET_MENSAJES,
    payload: valor,
  };
};
