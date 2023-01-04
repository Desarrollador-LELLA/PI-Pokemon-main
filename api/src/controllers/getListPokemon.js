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
      return {
        urls: data.results.map((x) => x.url), next: data.next
      };
    })
    .then(async (data) => {
      await Promise.all(data.urls.map((x) =>
        fetch(x).then((res) => res.json()).catch((err) => {
          throw new Error(err.message);
        })
      )).then((data) => {
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
        .catch((err) => { throw new Error(err.message); });
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
        retorno = data.results.map((x) => {
          return { nombre: x.name };
        });
      } else {
        retorno = {
          id: data.id,
          nombre: data.name,
          vida: data.stats[0].base_stat,
          ataque: data.stats[1].base_stat,
          defenza: data.stats[2].base_stat,
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

const validarPokemon = ({ nombre, altura, peso, vida, defenza, ataque, velocidad, imagen, tipos, }) => {
  const obj = {};

  if (nombre.toString().trim().length === 0) {
    obj.nombre = 'El Nombre esta Vacio';
  } else if (Number(nombre)) {
    obj.nombre = 'El Nombre No Pueden ser solo Numeros';
  }
  if (altura.toString().trim().length === 0) {
    obj.altura = 'La Altura esta Vacia';
  } else if (!Number(altura)) {
    obj.altura = 'La Altura No es un Numero';
  } else if (altura < 0 || altura > 280) {
    obj.altura = 'La Altura solo puede estar entre 0 a 280';
  }

  if (peso.toString().trim().length === 0) {
    obj.peso = 'El Peso esta Vacio';
  } else if (!Number(peso)) {
    obj.peso = 'El Peso No es un Numero';
  } else if (peso < 0 || peso > 280) {
    obj.peso = 'El Peso solo puede estar entre 0 a 280';
  }

  if (vida.toString().trim().length === 0) {
    obj.vida = 'La Vida esta Vacia';
  } else if (!Number(vida)) {
    obj.vida = 'La Vida No es un Numero';
  } else if (vida < 0 || vida > 280) {
    obj.vida = 'La Vida solo puede estar entre 0 a 280';
  }

  if (defenza.toString().trim().length === 0) {
    obj.defenza = 'La Defenza esta Vacia';
  } else if (!Number(defenza)) {
    obj.defenza = 'La Defenza No es un Numero';
  } else if (defenza < 0 || defenza > 280) {
    obj.defenza = 'La Defenza solo puede estar entre 0 a 280';
  }

  if (ataque.toString().trim().length === 0) {
    obj.ataque = 'El Ataque esta Vacio';
  } else if (!Number(ataque)) {
    obj.ataque = 'El Ataque No es un Numero';
  } else if (ataque < 0 || ataque > 280) {
    obj.ataque = 'El Ataque solo puede estar entre 0 a 280';
  }

  if (velocidad.toString().trim().length === 0) {
    obj.velocidad = 'La Velocidad esta Vacia';
  } else if (!Number(velocidad)) {
    obj.velocidad = 'La Velocidad No es un Numero';
  } else if (velocidad < 0 || velocidad > 280) {
    obj.velocidad = 'La Velocidad solo puede estar entre 0 a 280';
  }

  if (imagen.toString().trim().length === 0) {
    obj.imagen = 'La Imagen esta Vacia';
  } else if (!/^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/.test(imagen)) {
    obj.imagen = 'La Url de la Imagen no es Valida';
  }

  if (tipos.length === 0) {
    obj.tipos = 'Debe enviar entre 1 a 4 tipos';
  } else if (tipos.includes(''.trim())) {
    obj.tipos = 'La Lista de Tipos tiene elementos Vacios';
  }

  return obj;
};

module.exports = {
  getListApi: async () => {
    try {
      const primerosVeintePoke = await queridoFetchTraedmeEsto(
        'https://pokeapi.co/api/v2/pokemon'
      );
      const segundosVeintePoke = await queridoFetchTraedmeEsto(
        primerosVeintePoke.next
      );
      const tercerosVeintePoke = await queridoFetchTraedmeEsto(
        segundosVeintePoke.next
      );
      // const cuartosVeintePoke = await queridoFetchTraedmeEsto(
      //   tercerosVeintePoke.next
      // );
      // const quintosVeintePoke = await queridoFetchTraedmeEsto(
      //   cuartosVeintePoke.next
      // );
      const apiSuma = await primerosVeintePoke.pokemons.concat(
        segundosVeintePoke.pokemons
      )
      .concat(tercerosVeintePoke.pokemons)
      // .concat(cuartosVeintePoke.pokemons)
      // .concat(quintosVeintePoke.pokemons);
      return apiSuma;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getListDb: async () => {
    try {
      const pokemons = await Pokemons.findAll({
        include: {
          model: Tipos, attributes: ['nombre'],
        },
      });
      const pokemonsList = await pokemons.map((x) => {
        return {
          ...x.dataValues, tipos: x.tipos.map((x) => x.nombre),
        };
      });
      return pokemonsList;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getById: async (id) => {
    try {
      if (/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(id)) {
        const pokemon = await Pokemons.findOne({
          where: { id },
          include: { model: Tipos, attributes: ['nombre'], },
        });
        if (pokemon) {
          return {
            ...pokemon.dataValues, tipos: pokemon.tipos.map((x) => x.nombre),
          };
        } else {
          throw new Error(`No se encontro un pokemon con el id ${id}`);
        }
      } else {
        const pokemonApi = await soloUno(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return pokemonApi;
      }
    } catch (err) {
      if (err.message.includes('Unexpected token N in JSON at position 0')) {
        throw new Error(`No se encontro un pokemon con el id ${id}`);
      }
      throw new Error(err.message);
    }
  },
  getByName: async (nombre) => {
    try {
      if (Number(nombre)) {
        throw new Error(`La busqueda no permite solo numeros: ${nombre}`);
      }
      const pokemon = await Pokemons.findOne({
        where: { nombre },
        include: { model: Tipos, attributes: ['nombre'], },
      });
      if (pokemon) {
        return {
          ...pokemon.dataValues, tipos: pokemon.tipos.map((x) => x.nombre),
        };
      } else {
        const pokemonApi = await soloUno(
          `https://pokeapi.co/api/v2/pokemon/${nombre}`
        );

        return pokemonApi;
      }
    } catch (err) {
      if (err.message.includes('Unexpected token N in JSON at position 0')) {
        throw new Error(`No se encontro un pokemon con el nombre ${nombre}`);
      }
      throw new Error(err.message);
    }
  },
  addPokemon: async (nombre, vida, ataque, defenza, velocidad, altura, peso, imagen, tipos) => {
    try {
      const men = validarPokemon({ nombre, vida, ataque, defenza, velocidad, altura, peso, imagen, tipos });
      const noErrors = Object.keys(men).length === 0;
      if (!noErrors) {
        throw new Error(JSON.stringify(men));
      }
      const pokemon = await Pokemons.create({ nombre, vida, ataque, defenza, velocidad, altura, peso, imagen });
      let rTipos = await Tipos.findAll({ where: { nombre: tipos } });
      await pokemon.addTipos(rTipos);
      const pokemoncreado = await Pokemons.findOne({
        where: { id: pokemon.dataValues.id },
        include: { model: Tipos, attributes: ['nombre'], },
      });
      if (pokemoncreado) {
        return {
          creado: { ...pokemoncreado.dataValues, tipos: pokemoncreado.tipos.map((x) => x.nombre) },
          message: 'Pokemon Creado Correctamente',
          con: true
        };
      }
      return { creado: {}, message: 'Pokemon Creado Correctamente Pero No retorno nada', con: false };
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error(JSON.stringify('El Nombre del Pokemon ya Existe'));
      } else {
        throw new Error(JSON.stringify(err.message));
      }
    }
  },
  getTipos: async () => {
    try {
      let tipos = await Tipos.findAll();
      if (!tipos.length) {
        const rTipos = await soloUno('https://pokeapi.co/api/v2/type', 'tipos');
        await Tipos.bulkCreate(rTipos);
        tipos = await Tipos.findAll();
      }
      return tipos;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deletePokemon: async (id) => {
    try {
      if (/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(id)) {
        const del = await Pokemons.destroy({
          where: { id: id, },
        });
        if(del === 0){
          throw new Error(`El ID ${id}, NO existe en la base de datos`);
        }
        return 'Pokemon Eliminado Correctamente';
      } else {
        throw new Error('El id No tiene el formato correcto');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
  editPokemon: async (id, nombre, vida, ataque, defenza, velocidad, altura, peso, imagen, tipos) => {
    try {
      const men = validarPokemon({ nombre, vida, ataque, defenza, velocidad, altura, peso, imagen, tipos });
      const noErrors = Object.keys(men).length === 0;
      if (!noErrors) {
        throw new Error(JSON.stringify(men));
      }
      await Pokemons.update({ nombre, vida, ataque, defenza, velocidad, altura, peso, imagen }, {
        where: { id: id }
      });
      await Tipopoke.destroy({
        where: { pokemonId: id },
      });

      const pokemon = await Pokemons.findByPk(id);
      let rTipos = await Tipos.findAll({ where: { nombre: tipos } });
      await pokemon.addTipos(rTipos);
      const pokemoncreado = await Pokemons.findOne({
        where: { id: pokemon.dataValues.id },
        include: { model: Tipos, attributes: ['nombre'] },
      });
      if (pokemoncreado) {
        return {
          edit: {
            ...pokemoncreado.dataValues, tipos: pokemoncreado.tipos.map((x) => x.nombre)
          },
          message: 'Pokemon Editado Correctamente',
          con: true
        };
      }
      return { edit: {}, message: 'Pokemon Editado Correctamente Pero No retorno nada', con: false };
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new Error(JSON.stringify('El Nombre del Pokemon ya Existe'));
      } else {
        throw new Error(JSON.stringify(err.message));
      }
    }
  },
};
