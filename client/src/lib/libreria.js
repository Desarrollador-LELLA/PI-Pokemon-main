const ValidaUUID4V = ({ id }) => {
  if (
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
      id
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const filtrarPokemons = ({ oddApi, oddCreados, optSeleUni, optSeleMultEx, optSeleMult, fptTipos, opDesc, opAsce, opAZ, opZA, opSinOrden, }, lista) => {
  let nuevaLista = [];
  if (oddApi && oddCreados) {
    nuevaLista = lista.slice();
  } else {
    if (oddCreados) {
      nuevaLista = lista.filter((x) => {
        return ValidaUUID4V(x);
      });
    } else {
      nuevaLista = lista.filter((x) => {
        return !ValidaUUID4V(x);
      });
    }
  }

  if (optSeleUni || optSeleMultEx) {
    nuevaLista = nuevaLista.filter((x) => {
      return fptTipos.every((p) => {
        return x.tipos.includes(p);
      });
    });
  } else if (optSeleMult) {
    nuevaLista = nuevaLista.filter((x) => {
      let retorno = fptTipos.length === 0 ? true : false;
      fptTipos.forEach((y) => {
        x.tipos.forEach((p) => {
          if (y === p) retorno = true;
        });
      });
      return retorno;
    });
  }

  if (opDesc) {
    nuevaLista.sort((a, b) => a.ataque - b.ataque);
  } else if (opAsce) {
    nuevaLista.sort((a, b) => b.ataque - a.ataque);
  } else if (opAZ) {
    nuevaLista.sort((a, b) => {
      if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) {
        return -1;
      }
      if (b.nombre.toLowerCase() < a.nombre.toLowerCase()) {
        return 1;
      }
      return 0; //Array.prototype.sort() expects a value to be returned at the end of arrow function
    });
  } else if (opZA) {
    nuevaLista.sort((a, b) => {
      if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
        return -1;
      }
      if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
        return 1;
      }
      return 0; //Array.prototype.sort() expects a value to be returned at the end of arrow function
    });
  }
  if (opSinOrden) {
    return nuevaLista;
  }
  return nuevaLista;
};

export const paginacion = (cantItems, paginaActual) => {
  const cantPaginas = Math.ceil(cantItems / 12);
  const paginasBar = [
    1,
    paginaActual > 3 && cantPaginas > 5 ? true : false,
    cantPaginas >= 2
      ? paginaActual > 3 && cantPaginas > 4
        ? paginaActual - 1 > cantPaginas - 3
          ? cantPaginas - 3
          : paginaActual - 1
        : 2
      : false,
    cantPaginas >= 3
      ? paginaActual > 3 && cantPaginas > 4
        ? paginaActual > cantPaginas - 2
          ? cantPaginas - 2
          : paginaActual
        : 3
      : false,
    cantPaginas >= 4
      ? paginaActual > 3 && cantPaginas > 4
        ? paginaActual + 1 > cantPaginas - 1
          ? cantPaginas - 1
          : paginaActual + 1
        : 4
      : false,
    paginaActual < cantPaginas - 2 && cantPaginas > 5 ? true : false,
    cantPaginas >= 5 ? cantPaginas : false,
  ];

  const fin = paginaActual * 12;
  const inicio = fin - 12;
  return { paginasBar, inicio, fin, cantPaginas };
};


// export const filtradoLibreria = ({  origen, tipo, alfabeticamente }, listPokemon ) => {

//   let listPokemonCopy = [];

//   if(origen === "ALL")
//   {
//       listPokemonCopy = listPokemon.slice();
//   }
//   else
//   {
//       if(origen === "CREATED")
//       {
//           listPokemonCopy = listPokemon.filter( (e) => e.createInDB );
//       }
//       else
//       {
//           listPokemonCopy = listPokemon.filter( (e) => !e.createInDB );
//       }
//   }

//   if(tipo !== "ALL")
//   {
//       listPokemonCopy = listPokemonCopy.filter( (e) => {
//           return e.types.includes(tipo);
//       });
//   }

//   if(alfabeticamente !== "ALL")
//   {
//       if(alfabeticamente === "A-Z")
//       {
//           listPokemonCopy.sort( (a,b) => {
//               if(b.name.toLowerCase() > a.name.toLowerCase())
//               {
//                   return -1;
//               }
//               if(b.name < a.name)
//               {
//                   return 1;
//               }
//               return 0;
//           })
//       }
//       else if(alfabeticamente === "Z-A")
//       {
//           listPokemonCopy.sort( (a,b) => {
//               if(a.name.toLowerCase() > b.name.toLowerCase())
//               {
//                   return -1;
//               }
//               if(a.name < b.name)
//               {
//                   return 1;
//               }
//               return 0;
//           })
//       }
//       else if(alfabeticamente === "ASC")
//       {
//           listPokemonCopy.sort((a, b) => b.attack - a.attack);
//       }
//       else if(alfabeticamente === "DESC")
//       {
//           listPokemonCopy.sort((a, b) => a.attack - b.attack);
//       }
//   }

//   return listPokemonCopy;
// }