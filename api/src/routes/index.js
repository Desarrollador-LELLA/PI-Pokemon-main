const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const controlador = require('../controllers/getListPokemon.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// [ ] GET /pokemons:
// Obtener un listado de los pokemons desde pokeapi.
// Debe devolver solo los datos necesarios para la ruta principal
router.get('/pokemons', async (req, res) => {
  try {
    const { nombre } = req.query;
    if (nombre) {
      const pokemonNombre = await controlador.getByName(nombre);
      res.status(200).json({
        message: `Pokemon ${nombre}, Encontrado Correctamente`,
        result: pokemonNombre,
        confirmation: true,
      });
    } else {
      const dbList = await controlador.getListDb();
      const apiList = await controlador.getListApi();
      const sumando = await dbList.concat(apiList);
      res.status(200).json({
        message: 'Lista de Pokemons Listada Correctamente',
        result: sumando,
        confirmation: true,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, result: [], confirmation: false });
  }
});

// [ ] GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
router.get('/pokemons/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await controlador.getById(id);
    res.status(200).json({
      message: 'Pokemon Encontrado Correctamente',
      result: pokemon,
      confirmation: true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, result: {}, confirmation: false });
  }
});

// [ ] GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado
//router.get('/pokemons?name="...", (req, res) => {});ALGO

// [ ] POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos relacionado con sus tipos.
router.post('/pokemons', async (req, res) => {
  try {
    const { nombre, vida, ataque, defenza, velocidad, altura, peso, imagen, tipos } = req.body;
    const envio = await controlador.addPokemon(nombre, vida, ataque, defenza, velocidad, altura, peso, imagen, tipos);
    res.status(200).json({ message: envio.message, result: envio.creado, confirmation: envio.con });
  } catch (err) {
    const uno = JSON.parse(err.message);
    res.status(500).json({ message: uno, result: {}, confirmation: false });
  }
});

// [ ] GET /types:
// Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
router.get('/tipos', async (req, res) => {
  try {
    const rTipos = await controlador.getTipos();
    res.status(200).json({ message: 'Tipos Listados Correctamente', result: rTipos, confirmation: true });
  } catch (err) {
    res.status(500).json({ message: err.message, result: {}, confirmation: false });
  }
});

router.delete("/pokemons/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ret = await controlador.deletePokemon(id);
    res.status(200).json({ message: ret, result: {}, confirmation: true });
  } catch (err) {
    res.status(500).json({ message: err.message, result: {}, confirmation: false });
  }
});

router.put('/pokemons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, vida, ataque, defenza, velocidad, altura, peso, imagen, tipos } = req.body;
    const envio = await controlador.editPokemon(id, nombre, vida, ataque, defenza, velocidad, altura, peso, imagen, tipos);
    res.status(200).json({ message: envio.message, result: envio.edit, confirmation: envio.con });
  } catch (err) {
    const uno = JSON.parse(err.message);
    res.status(500).json({ message: uno, result: {}, confirmation: false });
  }
});
//COMENTARIO
module.exports = router;
