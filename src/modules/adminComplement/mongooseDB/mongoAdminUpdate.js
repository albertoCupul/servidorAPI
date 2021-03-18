const AdminAccess = require('./models/admin/AdminAcces');
const AdminDetail = require('./models/admin/AdminDetail');
const encrypt = require('../../sessions/encrypt');

async function updateAccess(infoAdmin) {
  try {
    const user = { ...infoAdmin.usuario[0] };
    const pwdEncrypted = await encrypt.encryptPwd(user.password);
    const SchemaAccess = new AdminAccess();
    /* eslint-disable-next-line no-underscore-dangle */
    const filter = { _id: user._id };
    const acceso = {
      email: user.email,
      pwd: pwdEncrypted,
      acountStatus: user.status,
    };
    const updated = await SchemaAccess.findOneAndUpdate(filter, acceso);
    return JSON.stringify({
      status: 201,
      message: 'User Admin updated succesfull',
      idMessage: 9002,
      module: 'admin managment',
      detail: updated,
    });
  } catch (e) {
    /* console.error(e); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9518,
      module: 'admin managment',
    });
  }
}

async function updatePerfil(infoAdmin) {
  try {
    const user = { ...infoAdmin.usuario[0] };
    /* eslint-disable-next-line no-underscore-dangle */
    const filter = { adminAcess: user._id };
    const perfil = {
      fullName: {
        name: user.nombre,
        lastName1: user.apellido_pat,
        lastName2: user.apellido_mat,
      },
      phone: user.telefono,
      birthday: user.fecha_nacimiento,
      rfc: user.rfc,
      address: user.domicilio,
      references: user.referencias,
      lastUpdate: new Date(),
    };
    const SchemaPerfil = new AdminDetail();
    const updated = await SchemaPerfil.findOneAndUpdate(filter, perfil);
    return JSON.stringify({
      status: 201,
      message: 'Perfil Admin updated succesfull',
      idMessage: 9003,
      module: 'admin managment',
      detail: updated,
    });
  } catch (e) {
    /* console.error(e); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9519,
      module: 'admin managment',
    });
  }
}

module.exports.updateAccess = updateAccess;
module.exports.updatePerfil = updatePerfil;
