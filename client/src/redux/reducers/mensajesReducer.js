import { SET_MENSAJES } from "../types/index";

const initialState = {
    mensaje: '',
}

const mensajesReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_MENSAJES:
        return {
          ...state,
          mensaje: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default mensajesReducer;
  