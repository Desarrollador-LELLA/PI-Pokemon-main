//import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/pages/Landing';
import Layout from './components/pages/Layout';
import Home from './components/pages/Home';
import CreaPokemon from './components/pages/CreaPokemon'
import DetallePokemon from './components/pages/DetallePokemon'
import Busqueda from './components/pages/Busqueda';
import PaginaNoFount from './components/pages/PaginaNoFount';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='*' element={<PaginaNoFount />} />
      <Route path='/pokemons' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='busqueda/:nombre' element={<Busqueda />} />
        <Route path='detalle/:id' element={<DetallePokemon />} />
        <Route path='crear' element={<CreaPokemon />} />
        <Route path='*' element={<PaginaNoFount />} />
      </Route>
    </Routes>
  );
}

export default App;
