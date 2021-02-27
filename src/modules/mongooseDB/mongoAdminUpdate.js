const mongoose = require('mongoose');
const AdminAccess = require('./models/admin/AdminAcces');
const AdminDetail = require('./models/admin/AdminDetail');

async function updateAdmin(infoAdmin, collection) {
  try {
    const user = { ...infoAdmin.usuario[0] };
    if (collection === 'login') {
      const SchemaAccess = new AdminAccess();
      /* eslint-disable-next-line no-underscore-dangle */
      const filter = { _id: user._id };
      const acceso = {
        email: user.email,
        pwd: user.password,
        acountStatus: user.status,
      };
      const updated = await SchemaAccess.findOneAndUpdate(filter, acceso);
      return JSON.stringify({
        status: 201,
        message: 'User Admin updated succesfull',
        idMessage: 9002,
        detail: updated,
      });
    }
    /* collection es iagual a perfil */
    /* eslint-disable-next-line no-underscore-dangle */
    const filter = { adminAcess: user._id };
    const perfil = {
      fullName: {
        name: user.nombre,
        lastName1: user.apellido_pat,
        lastName2: user.apellido_mat,
      },
      phone: user.telefono,
      lastUpdate: new Date(),
    };
    const SchemaPerfil = new AdminDetail();
    const updated = await SchemaPerfil.findOneAndUpdate(filter, perfil);
    return JSON.stringify({
      status: 201,
      message: 'Perfil Admin updated succesfull',
      idMessage: 9003,
      detail: updated,
    });
  } catch (e) {
    /* console.error(e); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9501,
    });
  }
}

module.exports.updateAdmin = updateAdmin;
