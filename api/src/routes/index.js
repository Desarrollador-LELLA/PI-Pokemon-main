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
    const { name } = req.query;
    if(name) {
        res.status(200).json({mensaje: 'En Construccion'});
    } else {
        //const result = await controlador.getListApi();
        const result = await controlador.getListDb();
        console.log(result[1].tipos)
        res.status(200).json({ success: result });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [ ] GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
router.get('/pokemons/:idPokemon', (req, res) => {
  
});

// [ ] GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado
//router.get('/pokemons?name="...", (req, res) => {});ALGO

// [ ] POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos relacionado con sus tipos.
router.post('/pokemons', async (req, res) => {
  try{
    const { nombre, vida, ataque, defensa, velocidad, altura, peso, imagen, tipo } = req.body;
    const envio = await controlador.addPokemon(nombre, vida, ataque, defensa, velocidad, altura, peso, imagen, tipo);
    envio.success ? res.status(201).json(envio) : res.status(406).json(envio);
  } catch(err){
    res.status(500).json({ error: err.message });
  }

});

// [ ] GET /types:
// Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
router.get('/types', (req, res) => {});

module.exports = router;
