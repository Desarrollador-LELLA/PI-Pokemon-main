import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import mensajesReducer from './reducers/mensajesReducer';
import pokemonsReducer from './reducers/pokemonsReducer';
import tiposReducer from './reducers/tiposReducer';

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  tipos: tiposReducer,
  mensajes: mensajesReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
