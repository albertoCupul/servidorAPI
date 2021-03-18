const verifyFields = require('../../verifyFields/product');

function validarRespuestasArray(array, puedeSerVacio = false) {
  try {
    let contFalse = 0;
    let response = false;
    if (array.length === 0) {
      if (puedeSerVacio) {
        response = true;
      }
    }
    array.map((item) => {
      const texto = JSON.stringify(item);
      const cadena = texto.indexOf('false');
      if (cadena >= 0) {
        contFalse += 1;
      }
      return true;
    });
    response = (contFalse === 0);
    return response;
  } catch (e) {
    /* console.error(e.message); */
    return false;
  }
}

function validarAllInfo(infoCategoria) {
  try {
    let validTitulo = false;
    let validDescripcion = false;
    const validAtributos = [];
    const validPrecio = [];
    const validCategoria = [];
    const validInventario = [];
    const validDimensiones = [];
    /* mapeando objeto jSON */
    const { product } = infoCategoria;
    /* mapeando objeto */
    const fields = Object.entries(product).map((entry) => {
      /* console.log(entry); */
      const label = entry[0];
      const value = entry[1];
      let bandLabel = false;
      let bandValor = false;
      /* se valida que la etiqueta no sea null o vacia */
      if (label) {
        /* console.log('existe'); */
        switch (label) {
          case 'titulo':
            validTitulo = verifyFields.validarTitulo(value);
            return { titulo: validTitulo };
          case 'descripcion':
            validDescripcion = verifyFields.validarDescripcion(value);
            return { descripcion: validDescripcion };
          case 'atributos':
            Object.entries(value).map((atributo) => {
              /* el atributo 0 es el nombre y el 1 es el valor */
              bandLabel = verifyFields.validarAtributo(atributo[1].nombre);
              bandValor = verifyFields.validarAtributo(atributo[1].valor);
              /* tanto la etiqueta como el valor son válidos */
              if (bandLabel && bandValor) {
                validAtributos.push({ atributo: true });
              } else {
                /* si alguno es nulo, no es correcto el atributo */
                validAtributos.push({ atributo: false });
              }
              return true;
            });
            return { atributos: validAtributos };
          case 'precio':
            Object.entries(value).map((precio) => {
              if (precio[0] === 'costo') {
                bandValor = verifyFields.validarPrecio(precio[1]);
                validPrecio.push({ costo: bandValor });
              }
              if (precio[0] === 'venta') {
                bandValor = verifyFields.validarPrecio(precio[1]);
                validPrecio.push({ venta: bandValor });
              }
              if (precio[0] === 'iva') {
                bandValor = verifyFields.validarBoolean(precio[1]);
                validPrecio.push({ iva: bandValor });
              }
              return true;
            });
            return { precio: validPrecio };
          case 'inventario':
            Object.entries(value).map((inventario) => {
              if (inventario[0] === 'minimo') {
                bandValor = verifyFields.validarPrecio(inventario[1]);
                validInventario.push({ minimo: bandValor });
              }
              if (inventario[0] === 'existencias') {
                bandValor = verifyFields.validarPrecio(inventario[1]);
                validInventario.push({ existencias: bandValor });
              }
              if (inventario[0] === 'administrar') {
                bandValor = verifyFields.validarBoolean(inventario[1]);
                validInventario.push({ administrar: bandValor });
              }
              return true;
            });
            return { inventario: validInventario };
          case 'dimensiones':
            Object.entries(value).map((dimension) => {
              if (dimension[0] === 'alto') {
                bandValor = verifyFields.validarDimensiones(dimension[1]);
                validDimensiones.push({ alto: bandValor });
              }
              if (dimension[0] === 'ancho') {
                bandValor = verifyFields.validarDimensiones(dimension[1]);
                validDimensiones.push({ ancho: bandValor });
              }
              if (dimension[0] === 'profundo') {
                bandValor = verifyFields.validarDimensiones(dimension[1]);
                validDimensiones.push({ profundo: bandValor });
              }
              if (dimension[0] === 'peso') {
                bandValor = verifyFields.validarDimensiones(dimension[1]);
                validDimensiones.push({ peso: bandValor });
              }
              return true;
            });
            return { dimensiones: validDimensiones };
          case 'categoria':
            Object.entries(value).map((categoria) => {
              if (categoria[0] === 'root') {
                bandValor = verifyFields.validarIdRoot(categoria[1]);
                validCategoria.push({ root: bandValor });
              }
              if (categoria[0] === 'child') {
                bandValor = verifyFields.validarId(categoria[1]);
                validCategoria.push({ child: bandValor });
              }
              if (categoria[0] === 'subChild') {
                bandValor = verifyFields.validarId(categoria[1]);
                validCategoria.push({ subChild: bandValor });
              }
              return true;
            });
            return { categoria: validCategoria };
          default:
            break;
        }
      }
      return null;
    });
    /* console.log(JSON.stringify(fields)); */

    /* el array atributo puede estar vacío o no */
    const validoAtributo = validarRespuestasArray(validAtributos, true);
    const validoDimensiones = validarRespuestasArray(validDimensiones, true);
    /* el array precio, inventario, categoria no pueden estar vacío */
    const validoPrecio = validarRespuestasArray(validPrecio);
    const validoInventario = validarRespuestasArray(validInventario);
    const validoCategoria = validarRespuestasArray(validCategoria);

    if (validoAtributo && validoDimensiones && validoPrecio
      && validoInventario && validoCategoria) {
      return JSON.stringify({
        status: 200,
        message: 'OK',
        idmessage: 9600,
        module: 'product managment',
      });
    }
    return JSON.stringify({
      status: 400,
      message: 'Validation fields error',
      idmessage: 9700,
      module: 'category managment',
      detail: fields,
    });
  } catch (e) {
    /* console.error(e.message); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Error Server',
      idMessage: 9500,
      module: 'category managment',
      detail: e.message,
    });
  }
}

function validarOnlyId(id) {
  try {
    /* buscando la categoría por Id */
    const resp = verifyFields.validarId(id);
    if (resp) {
      return JSON.stringify({
        status: 200,
        message: 'OK',
        idMessage: 9606,
        module: 'category managment',
      });
    }
    return JSON.stringify({
      status: 404,
      message: 'Validation field error',
      idMessage: 9708,
      module: 'category managment',
      detail: { id },
    });
  } catch (e) {
    /* console.error(e.message); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Error Server',
      idMessage: 9506,
      module: 'category managment',
      detail: e.message,
    });
  }
}

// function validarInfoUpdate(infoCategoria) {
//   try {
//     /* mapeando objeto jSON */
//     const { category } = infoCategoria;
//     let validName = false;
//     let validParent = false;
//     let validRoot = false;
//     let validId = false;
//     /* mapeando objeto */
//     const fields = Object.entries(category).map((entry) => {
//       /* console.log(entry); */
//       const label = entry[0];
//       const value = entry[1];
//       /* se valida que la etiqueta no sea null o vacia */
//       if (label) {
//         /* console.log('existe'); */
//         switch (label) {
//           case 'name':
//             validName = verifyFields.validarNombre(value);
//             return { name: validName };
//           case 'root':
//             validRoot = verifyFields.validarSiEsRoot(value);
//             return { root: validRoot };
//           case 'parent':
//             validParent = verifyFields.validarId(value);
//             return { parent: validParent };
//           case '_id':
//             validId = verifyFields.validarId(value);
//             return { parent: validParent };
//           default:
//             break;
//         }
//       }
//       return true;
//     });
//     /* console.log(`validName:  ${validName}
//     validParent:  ${validParent}
//     validRoot:   ${validRoot}`); */
//     if (validName && validRoot && validParent && validId) {
//       return JSON.stringify({
//         status: 200,
//         message: 'OK',
//         idmessage: 9600,
//         module: 'category managment',
//       });
//     }
//     return JSON.stringify({
//       status: 400,
//       message: 'Validation fields error',
//       idMessage: 9700,
//       module: 'category managment',
//       detail: fields,
//     });
//   } catch (e) {
//     /* console.error(e.message); */
//     return JSON.stringify({
//       status: 500,
//       message: 'Internal Error Server',
//       idMessage: 9500,
//       module: 'category managment',
//       detail: e.message,
//     });
//   }
// }
module.exports.validarAllInfo = validarAllInfo;
module.exports.validarOnlyId = validarOnlyId;
