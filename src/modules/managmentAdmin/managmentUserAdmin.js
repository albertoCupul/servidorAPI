const varifyFields = require('../verifyFields/verifyRequieredFields');

function validarAllInfoAdmin(jsonUserAdmin) {
  try {
    /* mapeando objeto jSON */
    const { usuario } = jsonUserAdmin;
    let validEmail = null;
    let validPwd = null;
    let validFullName = null;
    let validPhone = null;
    const resp = usuario.map((admin) => {
      let response = null;
      /* mostrando contenido de usuario {} */
      /* console.log(admin); */
      /* validando campos obligatorios */
      validEmail = varifyFields.validarEmail(admin.email);
      validPwd = varifyFields.validarPassword(admin.password);
      validFullName = varifyFields.validarFullName(admin);
      validPhone = varifyFields.validarTelefono(admin.telefono);
      /* console.log(`email: ${validEmail}  Pwd: ${validPwd}
      FullName: ${validFullName}   Phone: ${validPhone}`); */
      if (validEmail && validPwd && validFullName && validPhone) {
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
        idMessage: 1,
        detail: {
          email: validEmail,
          password: validPwd,
          fullName: validFullName,
          phone: validPhone,
        },
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'OK',
    });
  } catch (e) {
    if (jsonUserAdmin) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 2,
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Server error',
    });
  }
}

function validarAdminAccesInfo(jsonUserAdmin) {
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
        idMessage: 1,
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
    });
  } catch (e) {
    if (jsonUserAdmin) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 2,
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Server error',
    });
  }
}

function validarAdminPerfil(jsonUserAdmin) {
  try {
    /* mapeando objeto jSON */
    const { usuario } = jsonUserAdmin;
    let validFullName = null;
    let validPhone = null;
    const resp = usuario.map((admin) => {
      let response = null;
      validFullName = varifyFields.validarFullName(admin);
      validPhone = varifyFields.validarTelefono(admin.telefono);
      /* console.log(`email: ${validEmail}  Pwd: ${validPwd}
      FullName: ${validFullName}   Phone: ${validPhone}`); */
      if (validFullName && validPhone) {
        /* retornamos que todo salio bien */
        response = true;
      }
      return response;
    });
    /* console.log(resp[0]); */
    if (resp[0] === null) {
      return JSON.stringify({
        status: 400,
        message: 'Validation fields error to update perfil admin',
        idMessage: 3,
        detail: {
          fullName: validFullName,
          phone: validPhone,
        },
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'OK',
    });
  } catch (e) {
    if (jsonUserAdmin) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 4,
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Server error',
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
        idMessage: 9503,
        detail: {
          email: valid,
        },
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'OK',
    });
  } catch (e) {
    if (email) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 5,
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Server error',
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
        idMessage: 9507,
        detail: {
          email: valid,
        },
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'OK',
    });
  } catch (e) {
    if (id) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 7,
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Server error',
    });
  }
}

module.exports.validarAllInfoAdmin = validarAllInfoAdmin;
module.exports.validarAdminAccesInfo = validarAdminAccesInfo;
module.exports.validarAdminPerfil = validarAdminPerfil;
module.exports.validarOnlyEmail = validarOnlyEmail;
module.exports.validarOnlyId = validarOnlyId;
