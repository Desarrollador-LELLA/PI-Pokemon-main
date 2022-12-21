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

export const filtrarPokemons = (
  {
    oddApi,
    oddCreados,
    optSeleUni,
    optSeleMultEx,
    optSeleMult,
    fptTipos,
    opDesc,
    opAsce,
    opAZ,
    opZA,
    opSinOrden,
  },
  lista
) => {
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
      if (b.nombre > a.nombre) {
        return -1;
      }
      if (b.nombre < a.nombre) {
        return 1;
      }
      return 0; //Array.prototype.sort() expects a value to be returned at the end of arrow function
    });
  } else if (opZA) {
    nuevaLista.sort((a, b) => {
      if (a.nombre > b.nombre) {
        return -1;
      }
      if (a.nombre < b.nombre) {
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
