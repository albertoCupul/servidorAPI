const model = require('./models/AdminAcces');

function ObjAdminAccess(email, pwd, loginStatus, acountStatus, idDetail) {
  this.email = email;
  this.pwd = pwd;
  this.loginStatus = loginStatus;
  this.acountStatus = acountStatus;
  this.idDetail = idDetail;
}

async function addAccessAdmin(infoAdmin) {
  try {
    const modelo = await model.schemaAdminAcces();
    const idDetailAdmin = await model.idObjGenerate(modelo);
    /* creando el objeto a añadir */
    const AdminAcces = new ObjAdminAccess(infoAdmin[0].email, infoAdmin[0].password, false, 'pendiente', idDetailAdmin);
    /* añadiendo Administrador */
    await modelo.create(AdminAcces);
    model.closeConection();
    return true;
    /* await adminAcces.save((() => true)); */
  } catch (e) {
    console.error(e.message);
    return false;
  }
}

async function addAdmin(infoAdmin) {
  const resp = await addAccessAdmin(infoAdmin);
  if (resp) {
    console.log('añadido');
  } else {
    console.log('no añadido');
  }
}

module.exports.addAdmin = addAdmin;
