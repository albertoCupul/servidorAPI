const db = require('../dataBase');

let conn;
async function schemaAdminAcces() {
  try {
    conn = await db.connect();
    /* definiendo esquema de acceso */
    const schema = new conn.Schema({
      email: { type: String, required: true },
      pwd: { type: String, required: true },
      loginStatus: { type: Boolean, required: true },
      acountStatus: { type: String, required: true },
      idDetail: { type: conn.Types.ObjectId, required: true },
    },
    {
      collection: 'AdminAccess',
    });
    /* compilando esquema access */
    const AdminAccess = conn.model('AdminAccess', schema);
    /* db.connection.close(); */
    return AdminAccess;
  } catch (e) {
    return null;
  }
}

async function idObjGenerate() {
  const idObj = new conn.Types.ObjectId();
  /* conn.connection.close(); */
  return idObj;
}

function closeConection() {
  conn.connection.close();
}

module.exports.schemaAdminAcces = schemaAdminAcces;
module.exports.idObjGenerate = idObjGenerate;
module.exports.closeConection = closeConection;
