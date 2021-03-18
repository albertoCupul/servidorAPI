const AdminAccess = require('./models/admin/AdminAcces');

async function getAccessAdmin(email) {
  try {
    const AccessInfo = new AdminAccess();
    const fields = 'email loginStatus';
    const data = await AccessInfo.findAdminByEmail(email, fields);
    if (data) {
      return JSON.stringify({
        status: 200,
        message: 'Acces Admin returned',
        idMessage: 9004,
        detail: data,
      });
    }
    return JSON.stringify({
      status: 400,
      message: 'Admin email not found',
      idMessage: 9505,
    });
  } catch (e) {
    return false;
  }
}

module.exports.getAccessAdmin = getAccessAdmin;
