const AdminAccess = require('./models/admin/AdminAcces');

async function logout(email) {
  try {
    const AccessInfo = new AdminAccess();
    const fields = 'email pwd  loginStatus';
    const data = await AccessInfo.findAdminByEmail(email, fields);
    /* preguntando si las contraseñas concuerdan */
    if (data) {
      /* actualizando estatus de logueado */
      const filter = { email };
      const objUpdate = { loginStatus: false, token: '' };
      const Schema = new AdminAccess();
      const updated = await Schema.findOneAndUpdate(filter, objUpdate);
      if (updated) {
        return JSON.stringify({
          status: 200,
          message: 'Admin logout succesfull',
          idMessage: 9007,
          module: 'admin managment',
        });
      }
      return JSON.stringify({
        status: 400,
        message: 'Error to logout',
        idMessage: 9015,
        module: 'admin managment',
      });
    }
    return JSON.stringify({
      status: 404,
      message: 'Not login session found',
      idMessage: 9510,
      module: 'admin managment',
    });
  } catch (e) {
    /* console.error(e); */
    return false;
  }
}

module.exports.logout = logout;
