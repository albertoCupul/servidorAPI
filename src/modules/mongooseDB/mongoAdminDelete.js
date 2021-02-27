const mongoose = require('mongoose');
const AdminAccess = require('./models/admin/AdminAcces');
const AdminDetail = require('./models/admin/AdminDetail');

async function removeAdmin(email) {
  try {
    const SchemaAccess = new AdminAccess();
    const SchemaPerfil = new AdminDetail();
    const fields = '_id';
    const id = await SchemaAccess.findAdminByEmail(email, fields);
    /* console.log(id); */
    if (id) {
      let filter = { _id: id };
      await SchemaAccess.findOneAndDelete(filter);
      filter = { adminAcess: id };
      await SchemaPerfil.findOneAndDelete(filter);
      return JSON.stringify({
        status: 200,
        message: 'Admin delete succesfull',
        idMessage: 9504,
      });
    }
    return JSON.stringify({
      status: 400,
      message: 'Admin email not found',
      idMessage: 9504,
    });
  } catch (e) {
    /* console.log(e); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9501,
    });
  }
}

module.exports.removeAdmin = removeAdmin;
