/* const mongoose = require('mongoose'); */
/* const AdminDetail = require('./models/admin/AdminDetail'); */
const ClientAccess = require('./models/client/ClientAcces');

async function getPerfilAdmin(id) {
  try {
    const AccessAdmin = new ClientAccess();
    /* const DetailAdmin = new AdminDetail(); */
    // const fields = 'email pwd  loginStatus -_id';
    const data = await AccessAdmin.findAllPerfil(id);
    /* console.log(data); */
    if (data) {
      return JSON.stringify({
        status: 200,
        message: 'Perfil returned',
        idMessage: 9005,
        module: 'client managment',
        detail: data,
      });
    }
    return JSON.stringify({
      status: 400,
      message: 'Perfil not found',
      idMessage: 9014,
      module: 'client managment',
    });
  } catch (e) {
    return JSON.stringify({
      status: 500,
      message: 'Internar Server Error ',
      idStatus: 9507,
      module: 'client managment',
    });
  }
}

module.exports.getPerfilAdmin = getPerfilAdmin;
