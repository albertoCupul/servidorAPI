/* const mongoose = require('mongoose'); */
/* const AdminDetail = require('./models/admin/AdminDetail'); */
const AdminAccess = require('./models/admin/AdminAcces');

async function getPerfilAdmin(id) {
  try {
    const AccessAdmin = new AdminAccess();
    /* const DetailAdmin = new AdminDetail(); */
    // const fields = 'email pwd  loginStatus -_id';
    const data = await AccessAdmin.findAllPerfil(id);
    /* console.log(data); */
    if (data) {
      return JSON.stringify({
        status: 226,
        message: 'Perfil Admin returned',
        idMessage: 9005,
        module: 'admin managment',
        detail: data,
      });
    }
    return JSON.stringify({
      status: 400,
      message: 'Perfil admin not found',
      idMessage: 9010,
      module: 'admin managment',
    });
  } catch (e) {
    return JSON.stringify({
      status: 500,
      message: 'Internar Server Error ',
      idMessage: 9502,
      module: 'admin managment',
    });
  }
}

module.exports.getPerfilAdmin = getPerfilAdmin;
