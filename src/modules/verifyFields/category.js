function validarNombre(name) {
  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]{3,25}$/;
  let resp = false;
  if (name) {
    resp = regex.test(name);
  }
  return resp;
}

function validarId(id) {
  const regex = /^[a-fA-F0-9]{24}$/;
  const resp = regex.test(id);
  return resp;
}

function validarNivel(nivel) {
  /* si su valor es true o false, esta correcta la validación */
  if (nivel === 0 || nivel === 1 || nivel === 2) {
    return true;
  }
  return false;
}

module.exports.validarNombre = validarNombre;
module.exports.validarNivel = validarNivel;
module.exports.validarId = validarId;
