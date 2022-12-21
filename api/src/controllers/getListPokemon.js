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
        data.urls.map((x) =>
          fetch(x)
            .then((res) => res.json())
            .catch((err) => {
              throw new Error(err.message);
            })
        )
      )
        .then((data) => {
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
        .catch((err) => {
          throw new Error(err.message);
        });
      retorno.next = data.next;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return retorno;
};

const soloUno = async (url, tipos) => {
  let retorno = null;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (tipos) {
        retorno = data.results.map((x) => { return { nombre: x.name}});
      } else {
        retorno = {
          id: data.id,
          nombre: data.name,
          vida: data.stats[0].base_stat,
          ataque: data.stats[1].base_stat,
          defensa: data.stats[2].base_stat,
          velocidad: data.stats[5].base_stat,
          altura: data.height,
          peso: data.weight,
          imagen: data.sprites.other.dream_world.front_default,
          tipos: data.types.map((y) => y.type.name),
        };
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
  return retorno;
};

module.exports = {
  getListApi: async () => {
    try {
      const primerosVeintePoke = await queridoFetchTraedmeEsto(
        'https://pokeapi.co/api/v2/pokemon'
      );
      //console.log(primerosVeintePoke)
      // const segundosVeintePoke = await queridoFetchTraedmeEsto(
      //   primerosVeintePoke.next
      // );
      // const tercerosVeintePoke = await queridoFetchTraedmeEsto(
      //   segundosVeintePoke.next
      // );
      // const cuartosVeintePoke = await queridoFetchTraedmeEsto(
      //   tercerosVeintePoke.next
      // );
      // const quintosVeintePoke = await queridoFetchTraedmeEsto(
      //   cuartosVeintePoke.next
      // );
      const apiSuma = await primerosVeintePoke.pokemons
        // .concat(segundosVeintePoke.pokemons)
        // .concat(tercerosVeintePoke.pokemons)
        // .concat(cuartosVeintePoke.pokemons)
        // .concat(quintosVeintePoke.pokemons);
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
    const pokemonsList = await pokemons.map((x) => {
      return {
        ...x.dataValues,
        tipos: x.tipos.map((x) => x.nombre),
      };
    });
    return pokemonsList;
  },
  getById: async (id) => {
    try {
      if (
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
          id
        )
      ) {
        const pokemon = await Pokemons.findOne({
          where: { id },
          include: {
            model: Tipos,
            attributes: ['nombre'],
          },
        });
        if (pokemon) {
          return {
            ...pokemon.dataValues,
            tipos: pokemon.tipos.map((x) => x.nombre),
          };
        } else {
          throw new Error('ROMPO TODO');
        }
      } else {
        const pokemonApi = await soloUno(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        return pokemonApi;
      }
    } catch (err) {
      throw new Error(`No se encontro un pokemon con el id ${id}`);
    }
  },
  getByName: async (nombre) => {
    try {
      const pokemon = await Pokemons.findOne({
        where: { nombre },
        include: {
          model: Tipos,
          attributes: ['nombre'],
        },
      });
      if (pokemon) {
        return {
          ...pokemon.dataValues,
          tipos: pokemon.tipos.map((x) => x.nombre),
        };
      } else {
        const pokemonApi = await soloUno(
          `https://pokeapi.co/api/v2/pokemon/${nombre}`
        );

        return pokemonApi;
      }
    } catch (err) {
      throw new Error(`No se encontro un pokemon con el nombre ${nombre}`);
    }
  },
  addPokemon: async (
    nombre,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
    imagen,
    tipos
  ) => {
    try {
      if (nombre) {
        const pokemon = await Pokemons.create({
          nombre,
          vida,
          ataque,
          defensa,
          velocidad,
          altura,
          peso,
          imagen,
        });
        let rTipos = await Tipos.findAll({ where: { nombre: tipos } });
        await pokemon.addTipos(rTipos);
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
  getTipos: async () => {
    let tipos = await Tipos.findAll();
    if (!tipos.length) {
      const rTipos = await soloUno('https://pokeapi.co/api/v2/type', 'tipos');
      await Tipos.bulkCreate(rTipos);
      tipos = await Tipos.findAll();
    }
    return tipos;
  },
};
