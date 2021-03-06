function validarDomicilio(domicilio) {
  const regex = /^[a-zA-Z0-9.#-\s]+$/;
  const resp = regex.test(domicilio);
  return resp;
}

function validarEmail(email) {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const resp = regex.test(email);
  return resp;
}

function validarPassword(myPwd) {
  /* SIGNOS PERMITIDOS : */
  const regex = /^[a-zA-Z0-9_$!¡#&*/]{8,16}$/;
  const resp = regex.test(myPwd);
  return resp;
}

function validarFullName(objAdmin) {
  /* El nombre no debe estar en blanco, los apellidos pueden ser iguales */
  /* solo aceptará simbolos de - ü */
  const regex = /^[a-zA-Z\s-üñÑ]+$/;
  let resp = '';
  let valid = regex.test(objAdmin.nombre);
  if (valid === true) {
    valid = regex.test(objAdmin.apellido_pat);
    if (valid === true) {
      valid = regex.test(objAdmin.apellido_mat);
      if (valid === true) {
        resp = true;
      } else {
        resp = false;
      }
    } else {
      resp = false;
    }
  } else {
    resp = false;
  }
  return resp;
}

function validarTelefono(numTelefonico) {
  /* el numero se recibe com (xxx)-xxx-xxxx */
  const regex = /^\([0-9]{3}\)-[0-9]{3}-[0-9]{4}$/;
  const resp = regex.test(numTelefonico);
  return resp;
}

function validarStatus(estado) {
  /* el estado solo puede ser pendiente - activo - inactivo */
  let band = false;
  switch (estado) {
    case 'pendiente':
      band = true;
      break;
    case 'activo':
      band = true;
      break;
    case 'suspendido':
      band = true;
      break;
    default:
      band = false;
      break;
  }
  return band;
}

function validarId(myId) {
  const regex = /^[a-fA-F0-9]{24}$/;
  const resp = regex.test(myId);
  return resp;
}

function validarRutas(ruta) {
  const regex = /^[a-zA-Z0-9-]+$/;
  const resp = regex.test(ruta);
  return resp;
}

module.exports.validarEmail = validarEmail;
module.exports.validarPassword = validarPassword;
module.exports.validarFullName = validarFullName;
module.exports.validarTelefono = validarTelefono;
module.exports.validarDomicilio = validarDomicilio;
module.exports.validarStatus = validarStatus;
module.exports.validarId = validarId;
module.exports.validarRutas = validarRutas;
