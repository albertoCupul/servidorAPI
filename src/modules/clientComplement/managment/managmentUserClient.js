const varifyFields = require('../../verifyFields/verifyRequieredFields');

function validarAllInfo(jsonUser) {
  try {
    /* mapeando objeto jSON */
    const { usuario } = jsonUser;
    let validEmail = null;
    let validPwd = null;
    let validFullName = null;
    let validPhone = null;
    const validSecondFields = {
      fecha_nacimiento: null,
      rfc: null,
      domicilio: null,
      referencias: null,
    };

    const resp = usuario.map((admin) => {
      let response = null;
      /* mostrando contenido de usuario {} */
      /* console.log(admin); */
      /* validando campos obligatorios */
      validEmail = varifyFields.validarEmail(admin.email);
      validPwd = varifyFields.validarPassword(admin.password);
      validFullName = varifyFields.validarFullName(admin);
      validPhone = varifyFields.validarTelefono(admin.telefono);
      /* si fecha de nacimiento esta declarado */
      if (typeof admin.fecha_nacimiento !== 'undefined') {
        const validarFechaNacimiento = varifyFields.validarFechaNacimiento(admin.fecha_nacimiento);
        validSecondFields.fecha_nacimiento = validarFechaNacimiento;
      }
      if (typeof admin.rfc !== 'undefined') {
        const validarRfc = varifyFields.validarRFC(admin.rfc);
        validSecondFields.rfc = validarRfc;
      }
      if (typeof admin.domicilio !== 'undefined') {
        const validarDomicilioUsuario = varifyFields.validarDomicilioUsuario(admin.domicilio);
        validSecondFields.domicilio = validarDomicilioUsuario;
      }
      if (typeof admin.referencias !== 'undefined') {
        const validarReferencias = varifyFields.validarDomicilioUsuario(admin.referencias);
        validSecondFields.referencias = validarReferencias;
      }
      /* console.log(`email: ${validEmail}  Pwd: ${validPwd}
      FullName: ${validFullName}   Phone: ${validPhone}`); */
      let count = 0;
      if (validEmail && validPwd && validFullName && validPhone) {
        /* verificamos si los campos secundarios tienen error */
        Object.values(validSecondFields).map((value) => {
          if (value === 'OK') {
            count += 1;
          }
          return value;
        });
        /* si hay o no campos secundarios, deberán haber siempre 4 OK */
        if (count === 4) {
          response = true;
        } else {
          response = null;
        }
        /* retornamos que todo salio bien */
      }
      return response;
    });
    if (resp[0] === null) {
      return JSON.stringify({
        status: 400,
        message: 'Validation fields error',
        idMessage: 9713,
        module: 'client managment',
        detail: {
          email: validEmail,
          password: validPwd,
          fullName: validFullName,
          phone: validPhone,
          secondFields: validSecondFields,
        },
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'OK',
      idMessage: 9600,
      module: 'client managment',
    });
  } catch (e) {
    /* console.error(e.message); */
    if (jsonUser) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 9701,
        module: 'client managment',
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9514,
      module: 'client managment',
    });
  }
}

function validarAccesInfo(jsonUserAdmin) {
  try {
    /* mapeando objeto jSON */
    const { usuario } = jsonUserAdmin;
    let validId = null;
    let validEmail = null;
    let validPwd = null;
    let validStatus = null;
    const resp = usuario.map((admin) => {
      let response = null;
      /* mostrando contenido de usuario {} */
      /* console.log(admin); */
      /* validando campos obligatorios */
      /* eslint-disable-next-line no-underscore-dangle */
      validId = varifyFields.validarId(admin._id);
      validEmail = varifyFields.validarEmail(admin.email);
      validPwd = varifyFields.validarPassword(admin.password);
      validStatus = varifyFields.validarStatus(admin.status);
      /* console.log(`email: ${validEmail}  Pwd: ${validPwd}
      FullName: ${validFullName}   Phone: ${validPhone}`); */
      if (validEmail && validPwd && validStatus && validId) {
        /* retornamos que todo salio bien */
        response = true;
      }
      return response;
    });
    /* console.log(resp[0]); */
    if (resp[0] === null) {
      return JSON.stringify({
        status: 400,
        message: 'Validation fields error',
        idMessage: 9703,
        module: 'client managment',
        detail: {
          email: validEmail,
          password: validPwd,
          status: validStatus,
          _id: validId,
        },
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'OK',
      idMessage: 9601,
      module: 'client managment',
    });
  } catch (e) {
    if (jsonUserAdmin) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 9704,
        module: 'client managment',
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9515,
      module: 'client managment',
    });
  }
}

function validarPerfil(jsonUserAdmin) {
  try {
    /* mapeando objeto jSON */
    const { usuario } = jsonUserAdmin;
    const validSecondFields = {
      fecha_nacimiento: null,
      rfc: null,
      domicilio: null,
      referencias: null,
    };
    let validFullName = null;
    let validPhone = null;
    const resp = usuario.map((admin) => {
      let response = null;
      validFullName = varifyFields.validarFullName(admin);
      validPhone = varifyFields.validarTelefono(admin.telefono);
      /* si fecha de nacimiento esta declarado */
      if (typeof admin.fecha_nacimiento !== 'undefined') {
        const validarFechaNacimiento = varifyFields.validarFechaNacimiento(admin.fecha_nacimiento);
        validSecondFields.fecha_nacimiento = validarFechaNacimiento;
      }
      if (typeof admin.rfc !== 'undefined') {
        const validarRfc = varifyFields.validarRFC(admin.rfc);
        validSecondFields.rfc = validarRfc;
      }
      if (typeof admin.domicilio !== 'undefined') {
        const validarDomicilioUsuario = varifyFields.validarDomicilioUsuario(admin.domicilio);
        validSecondFields.domicilio = validarDomicilioUsuario;
      }
      if (typeof admin.referencias !== 'undefined') {
        const validarReferencias = varifyFields.validarDomicilioUsuario(admin.referencias);
        validSecondFields.referencias = validarReferencias;
      }
      /* console.log(`email: ${validEmail}  Pwd: ${validPwd}
      FullName: ${validFullName}   Phone: ${validPhone}`); */
      if (validFullName && validPhone) {
        /* verificamos si los campos secundarios tienen error */
        let count = 0;
        Object.values(validSecondFields).map((value) => {
          if (value === 'OK') {
            count += 1;
          }
          return value;
        });
        /* si hay o no campos secundarios, deberán haber siempre 4 OK */
        if (count === 4) {
          response = true;
        } else {
          response = null;
        }
        /* retornamos que todo salio bien */
      }
      return response;
    });
    if (resp[0] === null) {
      return JSON.stringify({
        status: 400,
        message: 'Validation fields error to update perfil',
        idMessage: 9705,
        module: 'client managment',
        detail: {
          fullName: validFullName,
          phone: validPhone,
          validSecondFields,
        },
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'OK',
      idMessage: 9602,
      module: 'client managment',
    });
  } catch (e) {
    if (jsonUserAdmin) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 9706,
        module: 'client managment',
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9516,
      module: 'client managment',
    });
  }
}

function validarOnlyEmail(email) {
  try {
    /* mapeando objeto jSON */
    let valid = null;
    let response = null;
    valid = varifyFields.validarEmail(email);
    /* console.log(`email: ${validEmail}  Pwd: ${validPwd}
    FullName: ${validFullName}   Phone: ${validPhone}`); */
    if (valid) {
      /* retornamos que todo salio bien */
      response = true;
    }
    if (response === null) {
      return JSON.stringify({
        status: 400,
        message: 'Validation email field error',
        idMessage: 9707,
        module: 'client managment',
        detail: {
          email: valid,
        },
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'OK',
      idMessage: 9603,
      module: 'client managment',
    });
  } catch (e) {
    if (email) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 9708,
        module: 'client managment',
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9517,
      module: 'client managment',
    });
  }
}

function validarOnlyId(id) {
  try {
    /* mapeando objeto jSON */
    let valid = null;
    let response = null;
    valid = varifyFields.validarId(id);
    /* console.log(`email: ${validEmail}  Pwd: ${validPwd}
    FullName: ${validFullName}   Phone: ${validPhone}`); */
    if (valid) {
      /* retornamos que todo salio bien */
      response = true;
    }
    if (response === null) {
      return JSON.stringify({
        status: 400,
        message: 'Validation route field error',
        idMessage: 9709,
        module: 'client managment',
        detail: {
          email: valid,
        },
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'OK',
      idMessage: 9604,
      module: 'client managment',
    });
  } catch (e) {
    if (id) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 9710,
        module: 'client managment',
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9518,
      module: 'client managment',
    });
  }
}

module.exports.validarAllInfo = validarAllInfo;
module.exports.validarAccesInfo = validarAccesInfo;
module.exports.validarPerfil = validarPerfil;
module.exports.validarOnlyEmail = validarOnlyEmail;
module.exports.validarOnlyId = validarOnlyId;
