//import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/pages/Landing';
import Layout from './components/pages/Layout';
import Home from './components/pages/Home';
import CreaPokemon from './components/pages/CreaPokemon'
import DetallePokemon from './components/pages/DetallePokemon'

function App() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path='pokemons' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='detalle' element={<DetallePokemon />} />
        <Route path=':id' element={<CreaPokemon />} />
      </Route>
    </Routes>
  );
}

export default App;
