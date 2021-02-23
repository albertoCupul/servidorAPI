const model = require('./models/AdminAcces');
const modelDetail = require('./models/AdminDetail');

/* variable globales */
let idObjDetail = null;

function ObjAdminAccess(email, pwd, loginStatus, acountStatus, idDetail) {
  this.email = email;
  this.pwd = pwd;
  this.loginStatus = loginStatus;
  this.acountStatus = acountStatus;
  this.idDetail = idDetail;
}

function ObjAdminDetail(registerDate, name, lastName1, lastName2, phone, idDetail) {
  this.registerDate = registerDate;
  this.fullName = {
    name,
    lastName1,
    lastName2,
  };
  this.phone = phone;
  this.idDetail = idDetail;
}

async function addAdminDetail(infoAdmin, idDetail) {
  try {
    const modelo = await modelDetail.schemaAdminDetail();
    const now = new Date();
    /* creando el objeto a añadir */
    const AdminDetail = new ObjAdminDetail(
      now,
      infoAdmin[0].nombre,
      infoAdmin[0].apellido_pat,
      infoAdmin[0].apellido_mat,
      infoAdmin[0].telefono,
      idDetail,
    );
    /* añadiendo Administrador */
    await modelo.create(AdminDetail);
    modelDetail.closeConection();
    return true;
  } catch (e) {
    /* console.error(e.message); */
    return false;
  }
}

async function addAccessAdmin(infoAdmin) {
  try {
    const modelo = await model.schemaAdminAcces();
    idObjDetail = await model.idObjGenerate(modelo);
    /* creando el objeto a añadir */
    const AdminAcces = new ObjAdminAccess(infoAdmin[0].email, infoAdmin[0].password, false, 'pendiente', idObjDetail);
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
  let resp = await addAccessAdmin(infoAdmin);
  if (resp) {
    /* console.log('añadido'); */
    resp = await addAdminDetail(infoAdmin, idObjDetail);
    /* si falla, hay que eliminar el adminAcces */
    /* y marcar como false a resp */
    if (!resp) {
      resp = false;
    }
  } else {
    console.log('no añadido');
    resp = false;
  }
  return resp;
}

module.exports.addAdmin = addAdmin;
