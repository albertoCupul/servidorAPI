const mongoose = require('mongoose');
const AdminAccess = require('./models/admin/AdminAcces');
const AdminDetail = require('./models/admin/AdminDetail');
const encrypt = require('../../sessions/encrypt');

/* const modelDetail = require('./models/AdminDetail'); */

async function addAccessAdmin(infoAdmin) {
  const acceso = await new AdminAccess();
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
      const newAdmin = await acceso.findAdminByEmail(infoAdmin.email);
      /* añadiendo detallado de objeto Admin */
      const detallado = await new AdminDetail();
      detallado.registerDate = new Date();
      detallado.fullName.name = infoAdmin.nombre;
      detallado.fullName.lastName1 = infoAdmin.apellido_pat;
      detallado.fullName.lastName2 = infoAdmin.apellido_mat;
      detallado.phone = infoAdmin.telefono;
      /* eslint-disable-next-line no-underscore-dangle */
      detallado.adminAcess = newAdmin._id;
      await detallado.save();
      /* console.log(newAdmin); */
      /* eslint-disable-next-line no-underscore-dangle */
      const perfilUsrAdmin = await acceso.findAllPerfil(newAdmin._id);
      /* console.log(`Este es el valor de all    ${all}`); */
      return JSON.stringify({
        status: 201,
        message: 'Admin user saved succesfull',
        idMessage: 9000,
        module: 'admin managment',
        detail: perfilUsrAdmin,
      });
    }
    /* console.log('Ya existe'); */
    return JSON.stringify({
      status: 200,
      message: 'Email already exist',
      idMessage: 9001,
      module: 'admin managment',
    });
  } catch (e) {
    /* console.log(e); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9500,
      module: 'admin managment',
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
