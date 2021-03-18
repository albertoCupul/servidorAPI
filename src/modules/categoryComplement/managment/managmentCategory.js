const verifyFields = require('../../verifyFields/category');

function validarAllInfo(infoCategoria) {
  try {
    let nivel = null;
    let validName = false;
    let validNivel = false;
    let validRoot = false;
    let validParent = false;
    /* mapeando objeto jSON */
    const { category } = infoCategoria;
    /* mapeando objeto */
    const fields = Object.entries(category).map((entry) => {
      /* console.log(entry); */
      const label = entry[0];
      const value = entry[1];
      /* se valida que la etiqueta no sea null o vacia */
      if (label) {
        /* console.log('existe'); */
        switch (label) {
          case 'name':
            validName = verifyFields.validarNombre(value);
            return { name: validName };
          case 'root':
            validRoot = verifyFields.validarId(value);
            return { root: validRoot };
          case 'parent':
            validParent = verifyFields.validarId(value);
            return { parent: validParent };
          case 'nivel':
            nivel = value;
            validNivel = verifyFields.validarNivel(value);
            return { nivel: validNivel };
          default:
            break;
        }
      }
      return false;
    });

    if (validName) {
      if (validNivel) {
        switch (nivel) {
          case 0:
            return JSON.stringify({
              status: 200,
              message: 'OK',
              idmessage: 9603,
              module: 'category managment',
            });
          case 1:
            if (validRoot) {
              return JSON.stringify({
                status: 200,
                message: 'OK',
                idmessage: 9604,
                module: 'category managment',
              });
            }
            return JSON.stringify({
              status: 400,
              message: 'Invalid Id Root',
              idmessage: 9705,
              module: 'category managment',
            });
          case 2:
            if (validRoot && validParent) {
              return JSON.stringify({
                status: 200,
                message: 'OK',
                idmessage: 9605,
                module: 'category managment',
              });
            }
            return JSON.stringify({
              status: 400,
              message: 'Invalid Id Root or Id Parent',
              idmessage: 9706,
              module: 'category managment',
            });
          default:
            return JSON.stringify({
              status: 400,
              message: 'Invalid parameters',
              idmessage: 9707,
              module: 'category managment',
              detail: fields,
            });
        }
      }
      return JSON.stringify({
        status: 400,
        message: 'Invalid nivel number',
        idmessage: 9704,
        module: 'category managment',
      });
    }
    return JSON.stringify({
      status: 400,
      message: 'Invalid name string',
      idmessage: 9703,
      module: 'category managment',
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
