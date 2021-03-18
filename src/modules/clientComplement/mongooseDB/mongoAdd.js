const mongoose = require('mongoose');
const ClientAccess = require('./models/client/ClientAcces');
const ClientDetail = require('./models/client/ClientDetail');
const encrypt = require('../../sessions/encrypt');

/* const modelDetail = require('./models/AdminDetail'); */

async function addAccessAdmin(infoAdmin) {
  const acceso = await new ClientAccess();
  try {
    const pwdEncrypted = await encrypt.encryptPwd(infoAdmin.password);
    /* console.log(pwdEncrypted); */
    const idDetail = mongoose.Types.ObjectId();
    acceso.email = infoAdmin.email;
    /* acceso.pwd = infoAdmin.password; */
    acceso.pwd = pwdEncrypted;
    acceso.loginStatus = false;
    acceso.acountStatus = 'pendiente';
    acceso.idDetail = idDetail;
    /* validando si el email existe en la BD */
    const existe = await acceso.findAdminByEmail(infoAdmin.email);
    /* console.log(`esto es existe    ${existe}`); */
    if (!existe) {
      /* console.log('no existe...salvando'); */
      await acceso.save();
      const newClient = await acceso.findAdminByEmail(infoAdmin.email);
      /* añadiendo detallado de objeto Admin */
      const detallado = await new ClientDetail();
      detallado.registerDate = new Date();
      detallado.fullName.name = infoAdmin.nombre;
      detallado.fullName.lastName1 = infoAdmin.apellido_pat;
      detallado.fullName.lastName2 = infoAdmin.apellido_mat;
      detallado.phone = infoAdmin.telefono;
      /* eslint-disable-next-line no-underscore-dangle */
      detallado.clientAcess = newClient._id;
      /* si fecha de nacimiento esta declarado */
      if (typeof infoAdmin.fecha_nacimiento !== 'undefined') {
        detallado.birthday = infoAdmin.fecha_nacimiento;
      }
      if (typeof infoAdmin.rfc !== 'undefined') {
        detallado.rfc = infoAdmin.rfc;
      }
      if (typeof infoAdmin.domicilio !== 'undefined') {
        detallado.address = infoAdmin.domicilio;
      }
      if (typeof infoAdmin.referencias !== 'undefined') {
        detallado.references = infoAdmin.referencias;
      }
      await detallado.save();
      /* console.log(newAdmin); */
      /* eslint-disable-next-line no-underscore-dangle */
      const perfilUsrAdmin = await acceso.findAllPerfil(newClient._id);
      /* console.log(`Este es el valor de all    ${all}`); */
      return JSON.stringify({
        status: 201,
        message: 'User saved succesfull',
        idMessage: 9000,
        module: 'client managment',
        detail: perfilUsrAdmin,
      });
    }
    /* console.log('Ya existe'); */
    return JSON.stringify({
      status: 200,
      message: 'Email already exist',
      idMessage: 9001,
      module: 'client managment',
    });
  } catch (e) {
    /* console.log(e); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9500,
      module: 'client managment',
    });
  }
}

async function addAdmin(infoAdmin) {
  try {
    /* creando copia independiente de los enviados */
    const user = { ...infoAdmin.usuario[0] };
    const resp = await addAccessAdmin(user);
    return resp;
  } catch (e) {
    return e;
  }
}

module.exports.addAdmin = addAdmin;
