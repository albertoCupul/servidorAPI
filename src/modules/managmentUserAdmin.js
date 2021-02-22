const varifyFields = require('./verifyFields/verifyRequieredFields');
const errorResponse = require('./responsesApi/adminSection');
const mongose = require('./mongooseDB/mongoAdmin');

/* recibe objeto json con toda la información del usuario */
function validarAllInfoAdmin(jsonUserAdmin) {
  /* mapeando objeto jSON */
  const { usuario } = jsonUserAdmin;
  let resData = null;
  usuario.map((admin) => {
    /* mostrando contenido de usuario {} */
    /* console.log(admin); */
    /* validando campos obligatorios */
    const validEmail = varifyFields.validarEmail(admin.email);
    const validPwd = varifyFields.validarPassword(admin.password);
    const validFullName = varifyFields.validarFullName(admin);
    const validPhone = varifyFields.validarTelefono(admin.telefono);
    /* console.log(`email: ${validEmail}  Pwd: ${validPwd}  */
    /* FullName: ${validFullName}   Phone: ${validPhone}`); */
    if (validEmail && validPwd && validFullName && validPhone) {
      /* agregando a la BD */
      mongose.addAdmin(usuario);
    } else {
      const response = errorResponse.RespAddAdminError({
        email: validEmail,
        password: validPwd,
        fullName: validFullName,
        phone: validPhone,
      });
      /* console.log(JSON.stringify(response.key));
      console.log(response); */
      resData = response;
      /* console.log(JSON.stringify(resData.key));
      console.log(resData); */
    }
    return true;
  });
  return resData;
}

module.exports.validarAllInfoAdmin = validarAllInfoAdmin;
