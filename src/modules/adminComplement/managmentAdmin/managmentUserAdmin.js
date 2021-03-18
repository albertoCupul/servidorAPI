const varifyFields = require('../../verifyFields/verifyRequieredFields');

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
        idMessage: 9702,
        module: 'admin managment',
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
      idmessage: 9603,
      module: 'admin managment',
    });
  } catch (e) {
    if (jsonUserAdmin) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 9703,
        module: 'admin managment',
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Internal Server error',
      idMessage: 9517,
      module: 'admin managment',
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
        idMessage: 9704,
        module: 'admin managment',
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
      idmessage: 9604,
      module: 'admin managment',
    });
  } catch (e) {
    if (jsonUserAdmin) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 9705,
        module: 'admin managment',
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9514,
      module: 'admin managment',
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
        idMessage: 9706,
        module: 'admin managment',
        detail: {
          fullName: validFullName,
          phone: validPhone,
        },
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'OK',
      idmessage: 9600,
      module: 'admin managment',
    });
  } catch (e) {
    if (jsonUserAdmin) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 9707,
        module: 'admin managment',
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Server error',
      idMessage: 9523,
      module: 'admin managment',
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
        idMessage: 9711,
        module: 'admin managment',
        detail: {
          email: valid,
        },
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'OK',
      idMessage: 9601,
      module: 'admin managment',
    });
  } catch (e) {
    if (email) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 9708,
        module: 'admin managment',
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idmessage: 9505,
      module: 'admin managment',
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
        idMessage: 9712,
        module: 'admin managment',
        detail: {
          email: valid,
        },
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'OK',
      idMessage: 9602,
      module: 'admin managment',
    });
  } catch (e) {
    if (id) {
      return JSON.stringify({
        status: 404,
        message: 'The body is empty',
        idMessage: 9709,
        module: 'admin managment',
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9515,
      module: 'admin managment',
    });
  }
}

module.exports.validarAllInfoAdmin = validarAllInfoAdmin;
module.exports.validarAdminAccesInfo = validarAdminAccesInfo;
module.exports.validarAdminPerfil = validarAdminPerfil;
module.exports.validarOnlyEmail = validarOnlyEmail;
module.exports.validarOnlyId = validarOnlyId;
