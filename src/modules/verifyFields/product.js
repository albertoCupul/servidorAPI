function validarTitulo(name) {
  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]{3,60}$/;
  let resp = false;
  if (name) {
    resp = regex.test(name);
  }
  return resp;
}

function validarDescripcion(name) {
  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\r.,-;!?¡¿()]{0,300}$/;
  let resp = false;
  if (name === null && name === '') {
    resp = true;
  } else {
    resp = regex.test(name);
  }
  return resp;
}

function validarAtributo(name) {
  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]{3,60}$/;
  let resp = false;
  if (name) {
    resp = regex.test(name);
  }
  return resp;
}

function validarId(id) {
  const regex = /^[a-fA-F0-9]{0,24}$/;
  const resp = regex.test(id);
  return resp;
}

function validarIdRoot(id) {
  const regex = /^[a-fA-F0-9]{24}$/;
  const resp = regex.test(id);
  return resp;
}

function validarPrecio(precio) {
  let resp = false;
  if (typeof (precio) === 'number') {
    resp = (precio >= 0.000);
  }
  return resp;
}

function validarBoolean(valor) {
  let resp = false;
  if (valor === true || valor === false) {
    resp = true;
  }
  return resp;
}

function validarDimensiones(dimension) {
  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]{3,7}$/;
  let resp = false;
  if (dimension) {
    resp = regex.test(dimension);
  }
  return resp;
}

function validarNivel(nivel) {
  /* si su valor es true o false, esta correcta la validación */
  if (nivel === 0 || nivel === 1 || nivel === 2) {
    return true;
  }
  return false;
}

module.exports.validarTitulo = validarTitulo;
module.exports.validarDescripcion = validarDescripcion;
module.exports.validarNivel = validarNivel;
module.exports.validarId = validarId;
module.exports.validarIdRoot = validarIdRoot;
module.exports.validarAtributo = validarAtributo;
module.exports.validarPrecio = validarPrecio;
module.exports.validarBoolean = validarBoolean;
module.exports.validarDimensiones = validarDimensiones;
