const moment = require('moment');

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

function validarFechaNacimiento(date) {
  if (date) {
    /* validando primero el formato yyyy-mm-dd */
    const regexFormat = /^\d{4}-\d{1,2}-\d{1,2}$/;
    let validFormat = regexFormat.test(date);
    if (validFormat) {
      /* validando fecha real, si no es real retorna NaN */
      const dateSent = moment(new Date(date));
      const diff = moment().diff(moment(dateSent), 'years');
      if (diff) {
        if (diff > 17) {
          validFormat = 'OK';
        } else {
          validFormat = 'the user must be at least 18 years old';
        }
      } else {
        validFormat = 'The date cannot be greater than the current one';
      }
    } else {
      validFormat = 'Incorrect date format';
    }
    return validFormat;
  }
  /* como viene vacío y no es requrido obligatoriamente */
  return 'OK';
}

function validarRFC(rfc) {
  /* persona fisica 13 caracteres: 4 letras, 6 número, 3 homoclabe */
  /* persona moral 12 caracteres: 3 letras, 6 número, 3 homoclabe */
  /* por lo que primero hay que saber si tiene 12 o 13 caracteres */
  if (rfc) {
    let response = null;
    let band = false;
    if (rfc.length === 13) {
      band = true;
      const regex = /^[A-Za-z]{4}\d{6}[a-zA-Z\d]{3}$/;
      const resp = regex.test(rfc);
      if (resp) {
        response = 'OK';
      } else {
        response = 'Invalid physical person RFC format';
      }
    }
    if (rfc.length === 12) {
      band = true;
      const regex = /^[A-Za-z]{3}\d{6}[a-zA-Z\d]{3}$/;
      const resp = regex.test(rfc);
      if (resp) {
        response = 'OK';
      } else {
        response = 'Invalid moral person RFC format';
      }
    }
    /* si no tiene 12 o 13 de longitud */
    if (band === false) {
      response = 'invalid RFC length';
    }
    return response;
  } /* como viene vacío y no es requrido obligatoriamente */
  return 'OK';
}

function validarDomicilioUsuario(domicilio) {
  if (domicilio) {
    let response = null;
    const regex = /^[a-zA-Z0-9.#-\s]+$/;
    const resp = regex.test(domicilio);
    if (resp) {
      response = 'OK';
    } else {
      response = 'Invalid address format';
    }
    return response;
  }
  /* como viene vacío y no es requrido obligatoriamente */
  return 'OK';
}

module.exports.validarEmail = validarEmail;
module.exports.validarPassword = validarPassword;
module.exports.validarFullName = validarFullName;
module.exports.validarTelefono = validarTelefono;
module.exports.validarDomicilio = validarDomicilio;
module.exports.validarStatus = validarStatus;
module.exports.validarId = validarId;
module.exports.validarRutas = validarRutas;
module.exports.validarFechaNacimiento = validarFechaNacimiento;
module.exports.validarRFC = validarRFC;
module.exports.validarDomicilioUsuario = validarDomicilioUsuario;
