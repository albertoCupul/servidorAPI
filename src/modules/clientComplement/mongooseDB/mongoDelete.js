const AdminAccess = require('./models/client/ClientAcces');
const AdminDetail = require('./models/client/ClientDetail');

async function removeClient(email) {
  try {
    const SchemaAccess = new AdminAccess();
    const SchemaPerfil = new AdminDetail();
    const fields = '_id';
    const id = await SchemaAccess.findAdminByEmail(email, fields);
    /* console.log(id); */
    if (id) {
      let filter = { _id: id };
      await SchemaAccess.findOneAndDelete(filter);
      filter = { clientAcess: id };
      await SchemaPerfil.findOneAndDelete(filter);
      return JSON.stringify({
        status: 200,
        message: 'Client delete succesfull',
        idMessage: 9008,
        module: 'client managment',
      });
    }
    return JSON.stringify({
      status: 400,
      message: 'Email client not found',
      idMessage: 9013,
      module: 'client managment',
    });
  } catch (e) {
    /* console.log(e); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9501,
      module: 'client managment',
    });
  }
}

module.exports.removeClient = removeClient;
