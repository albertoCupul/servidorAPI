const db = require('../dataBase');

let conn;

async function schemaAdminDetail() {
  try {
    conn = await db.connect();
    /* definiendo esquema de acceso */
    const schema = new conn.Schema({
      registerDate: { type: Date, required: true },
      fullName: {
        name: { type: String, required: true },
        lastName1: { type: String, required: true },
        lastName2: String,
      },
      phone: String,
      idDetail: { type: conn.Types.ObjectId, required: true },
    },
    {
      collection: 'AdminDetail',
    });
    /* compilando esquema access */
    const AdminDetail = conn.model('AdminDetail', schema);
    /* db.connection.close(); */
    return AdminDetail;
  } catch (e) {
    return null;
  }
}

function closeConection() {
  conn.connection.close();
}

module.exports.schemaAdminDetail = schemaAdminDetail;
module.exports.closeConection = closeConection;
