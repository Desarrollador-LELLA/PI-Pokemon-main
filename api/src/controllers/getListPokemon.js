const fetch = require('node-fetch');
const { Pokemons, Tipos, Tipopoke } = require('../db.js');

// Únicos Endpoints/Flags que pueden utilizar
// GET https://pokeapi.co/api/v2/pokemon
// GET https://pokeapi.co/api/v2/pokemon/{id}
// GET https://pokeapi.co/api/v2/pokemon/{name}
// GET https://pokeapi.co/api/v2/type

//AXULIARES
const queridoFetchTraedmeEsto = async (url) => {
  let retorno = { pokemons: null, next: '' };
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return { urls: data.results.map((x) => x.url), next: data.next };
    })
    .then(async (data) => {
      await Promise.all(
        data.urls.map((x) => fetch(x).then((res) => res.json()).catch(err => { throw new Error(err.message) }))
      ).then((data) => {
        retorno.pokemons = data.map((x) => {
          return {
            id: x.id,
            nombre: x.name,
            vida: x.stats[0].base_stat,
            ataque: x.stats[1].base_stat,
            defensa: x.stats[2].base_stat,
            velocidad: x.stats[5].base_stat,
            altura: x.height,
            peso: x.weight,
            imagen: x.sprites.other.dream_world.front_default,
            tipos: x.types.map((y) => y.type.name),
          };
        });
      })
      .catch(err => {
        throw new Error(err.message);
      });
      retorno.next = data.next;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return retorno;
};

module.exports = {
  getListApi: async () => {
    try {
      const primerosVeintePoke = await queridoFetchTraedmeEsto(
        'https://pokeapi.co/api/v2/pokemon'
      );
      const segundosVeintePoke = await queridoFetchTraedmeEsto(primerosVeintePoke.next);
      const apiSuma = await primerosVeintePoke.pokemons.concat(
        segundosVeintePoke.pokemons
      );
      return apiSuma;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getListDb: async () => {
    const pokemons = await Pokemons.findAll({
      include: {
        model: Tipos,
        attributes: ['nombre'],
      },
    });

    const pokemonsList = pokemons.map(x => x.dataValues)
    // const pokemonsList = await pokemons.map(x => {
    //   return {
    //     ...x.dataValues,
    //     tipos: x.tipos.map(x => x.nombre)
    //   }
    // })
    return pokemonsList;
  },
  addPokemon: async (nombre, vida, ataque, defensa, velocidad, altura, peso, imagen, tipo) => {
    try {
      if (nombre) {
        const pokemon = await Pokemons.create({ nombre, vida, ataque, defensa, velocidad, altura, peso, imagen, });
        let tipos = await Tipos.findAll({ where: { nombre: tipo } });
        console.log('PRIMERO TIPOS', tipos);
        if (!tipos.length) {
          console.log('ENTRO');

          await Tipos.create({ nombre: tipo[0] });
          tipos = await Tipos.findAll({ where: { nombre: tipo } });
        }

        console.log(tipos);
        const uno = await pokemon.addTipos(tipos); //ESTO NO SE REALIZA !!!!!!!!
        return { success: 'Pokemon Creado Correctamente' };
      } else {
        return { error: 'Falta Nombre del Pokemon' };
      }
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return { error: 'El Nombre del Pokemon ya Existe' };
      } else {
        throw new Error(err);
      }
    }
  },
  getId: (id) => {},
};
