const express = require('express');
const db = require('../modules/adminComplement/mongooseDB/mongoAdminAdd');
const adminUpdate = require('../modules/adminComplement/mongooseDB/mongoAdminUpdate');
const adminDelete = require('../modules/adminComplement/mongooseDB/mongoAdminDelete');
const adminGetPerfil = require('../modules/adminComplement/mongooseDB/mongoAdminGetPerfil');
const adminLogin = require('../modules/adminComplement/mongooseDB/mongoAdminLogin');
const adminLogout = require('../modules/adminComplement/mongooseDB/mongoAdminLogout');

/* importando modulos propios */

const userAdmin = require('../modules/adminComplement/managmentAdmin/managmentUserAdmin');

const adminRouter = express.Router();

adminRouter.post('/create', async (req, res) => {
  try {
    let response;
    const jsonInfoAdmin = req.body;
    const jsonData = await userAdmin.validarAllInfoAdmin(jsonInfoAdmin);
    const respJson = JSON.parse(jsonData);
    /* la validación es ok */
    if (respJson.status === 200) {
      response = await db.addAdmin(jsonInfoAdmin);
      response = JSON.parse(response);
      /* guardando el detallado del perfil admin */
      /* el email ya existe o hubo un error */
      res.status(response.status).send(response);
    } else {
      res.status(respJson.status).send(respJson);
    }
  } catch (e) {
    /* console.log(e); */
    res.status(JSON.parse(e).status).send(e);
  }
});

adminRouter.post('/update/login/', async (req, res) => {
  try {
    let response;
    const jsonInfoAdmin = req.body;
    const jsonData = await userAdmin.validarAdminAccesInfo(jsonInfoAdmin);
    const respJson = JSON.parse(jsonData);
    /* la validación es ok */
    if (respJson.status === 200) {
      response = await adminUpdate.updateAccess(jsonInfoAdmin);
      response = JSON.parse(response);
      /* actualizado el acceso del perfil admin */
      /* hubo un error al actualizar el perfil */
      res.status(response.status).send(response);
    } else {
      res.status(respJson.status).send(respJson);
    }
  } catch (e) {
    /* console.log(e); */
    res.status(JSON.parse(e).status).send(e);
  }
});

adminRouter.post('/update/perfil/', async (req, res) => {
  try {
    let response;
    const jsonInfoAdmin = req.body;
    const jsonData = await userAdmin.validarAdminPerfil(jsonInfoAdmin);
    const respJson = JSON.parse(jsonData);
    /* la validación es ok */
    if (respJson.status === 200) {
      response = await adminUpdate.updatePerfil(jsonInfoAdmin);
      response = JSON.parse(response);
      /* actualizado detallado del perfil admin */
      /* hubo un error al actualizar el perfil */
      res.status(response.status).send(response);
    } else {
      res.status(respJson.status).send(respJson);
    }
  } catch (e) {
    /* console.log(e); */
    res.status(JSON.parse(e).status).send(e);
  }
});

adminRouter.post('/delete/:email', async (req, res) => {
  try {
    let response;
    const { email } = req.params;
    const jsonData = await userAdmin.validarOnlyEmail(email);
    const respJson = JSON.parse(jsonData);
    /* la validación es ok */
    if (respJson.status === 200) {
      response = await adminDelete.removeAdmin(email);
      response = JSON.parse(response);
      /* console.log(JSON.parse(response)); */
      /* guardando el detallado del perfil admin o hubo error */
      res.status(response.status).send(response);
    } else {
      res.status(response.status).send(response);
    }
  } catch (e) {
    /* console.log(e); */
    res.status(JSON.parse(e).status).send(e);
  }
});

/* RETORNAR el perfil completo del usuario por el id
y los datos de acceso al API */
adminRouter.get('/:option/:key', async (req, res) => {
  try {
    let response;
    const { option } = req.params;
    const { key } = req.params;
    let jsonData = null;
    switch (option) {
      case 'perfil':
        jsonData = await userAdmin.validarOnlyId(key);
        jsonData = JSON.parse(jsonData);
        if (jsonData.status === 200) {
          response = await adminGetPerfil.getPerfilAdmin(key);
          response = JSON.parse(response);
          return res.status(response.status).send(response);
        }
        return res.status(400).send({
          status: 400,
          message: 'ID not valid',
          idMessage: 9700,
          module: 'admin managment',
        });
      default:
        return res.status(400).send({
          status: 400,
          message: 'Option not valid',
          idMessage: 9701,
          module: 'admin managment',
        });
    }
  } catch (e) {
    /* console.log(e); */
    return res.status(JSON.parse(e).status).send(e);
  }
});

/* método de login */
adminRouter.post('/login/:email/', async (req, res) => {
  try {
    let response;
    const { email } = req.params;
    const pwd = req.body.usuario[0].password;
    let jsonData = null;
    jsonData = await userAdmin.validarOnlyEmail(email);
    if (JSON.parse(jsonData).status === 200) {
      /* extraemos informacion */
      response = await adminLogin.validateLogin(email, pwd);
      response = JSON.parse(response);
      return res.status(response.status).send(response);
    }
    return res.status(400).send({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9516,
      module: 'admin managment',
    });
  } catch (e) {
    /* console.error(e.message); */
    if (e.message === "Cannot read property '0' of undefined") {
      return res.status(400).send({
        status: 400,
        message: 'The body is empty',
        idMessage: 9710,
        module: 'admin managment',
      });
    }
    return res.status(JSON.parse(e).status).send(e);
  }
});

/* método de logou */
adminRouter.post('/logout/:email/', async (req, res) => {
  try {
    let response;
    const { email } = req.params;
    let jsonData = null;
    jsonData = await userAdmin.validarOnlyEmail(email);
    if (JSON.parse(jsonData).status === 200) {
      /* extraemos informacion */
      response = await adminLogout.logout(email);
      response = JSON.parse(response);
      return res.status(response.status).send(response);
    }
    return res.status(500).send({
      status: 500,
      message: 'Internal Error',
      idMessage: 9521,
      module: 'admin managment',
    });
  } catch (e) {
    /* console.log(e); */
    return res.status(JSON.parse(e).status).send(e);
  }
});

module.exports = adminRouter;
