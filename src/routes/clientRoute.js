const express = require('express');
const clientAdd = require('../modules/clientComplement/mongooseDB/mongoAdd');
const clientUpdate = require('../modules/clientComplement/mongooseDB/mongoUpdate');
const clientDelete = require('../modules/clientComplement/mongooseDB/mongoDelete');
const clientLogin = require('../modules/clientComplement/mongooseDB/mongoLogin');
const clientLogout = require('../modules/clientComplement/mongooseDB/mongoLogout');
const clientGetPerfil = require('../modules/clientComplement/mongooseDB/mongoGetPerfil');

/* importando modulos propios */

const user = require('../modules/clientComplement/managment/managmentUserClient');

const clientRouter = express.Router();

clientRouter.post('/create', async (req, res) => {
  try {
    let response;
    const jsonInfoAdmin = req.body;
    const jsonData = await user.validarAllInfo(jsonInfoAdmin);
    const respJson = JSON.parse(jsonData);
    /* la validación es ok */
    if (respJson.status === 200) {
      response = await clientAdd.addAdmin(jsonInfoAdmin);
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

clientRouter.post('/update/login/', async (req, res) => {
  try {
    let response;
    const jsonInfoAdmin = req.body;
    const jsonData = await user.validarAccesInfo(jsonInfoAdmin);
    const respJson = JSON.parse(jsonData);
    /* la validación es ok */
    if (respJson.status === 200) {
      response = await clientUpdate.updateAccess(jsonInfoAdmin);
      response = JSON.parse(response);
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

clientRouter.post('/update/perfil/', async (req, res) => {
  try {
    let response;
    const jsonInfoAdmin = req.body;
    const jsonData = await user.validarPerfil(jsonInfoAdmin);
    const respJson = JSON.parse(jsonData);
    /* la validación es ok */
    if (respJson.status === 200) {
      response = await clientUpdate.updatePerfil(jsonInfoAdmin);
      response = JSON.parse(response);
      /* todo ok o hubo un error */
      res.status(response.status).send(response);
    } else {
      res.status(respJson.status).send(respJson);
    }
  } catch (e) {
    /* console.log(e); */
    res.status(JSON.parse(e).status).send(e);
  }
});

clientRouter.post('/delete/:email', async (req, res) => {
  try {
    let response;
    const { email } = req.params;
    const jsonData = await user.validarOnlyEmail(email);
    const respJson = JSON.parse(jsonData);
    /* la validación es ok */
    if (respJson.status === 200) {
      response = await clientDelete.removeClient(email);
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

/* método de login */
clientRouter.post('/login/:email/', async (req, res) => {
  try {
    let response;
    const { email } = req.params;
    const pwd = req.body.usuario[0].password;
    let jsonData = null;
    jsonData = await user.validarOnlyEmail(email);
    if (JSON.parse(jsonData).status === 200) {
      /* extraemos informacion */
      response = await clientLogin.validateLogin(email, pwd);
      response = JSON.parse(response);
      return res.status(response.status).send(response);
    }
    return res.status(400).send({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9519,
      module: 'client managment',
    });
  } catch (e) {
    /* console.error(e.message); */
    if (e.message === "Cannot read property '0' of undefined") {
      return res.status(400).send({
        status: 404,
        message: 'The body is empty',
        idMessage: 9016,
        module: 'client managment',
      });
    }
    return res.status(JSON.parse(e).status).send(e);
  }
});

/* método de logout */
clientRouter.post('/logout/:email/', async (req, res) => {
  try {
    let response;
    const { email } = req.params;
    let jsonData = null;
    jsonData = await user.validarOnlyEmail(email);
    if (JSON.parse(jsonData).status === 200) {
      /* extraemos informacion */
      response = await clientLogout.logout(email);
      response = JSON.parse(response);
      return res.status(response.status).send(response);
    }
    return res.status(500).send({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9520,
      module: 'client managment',
    });
  } catch (e) {
    /* console.log(e); */
    return res.status(JSON.parse(e).status).send(e);
  }
});

clientRouter.get('/perfil/:email', async (req, res) => {
  try {
    let response;
    const { email } = req.params;
    let jsonData = null;
    jsonData = await user.validarOnlyId(email);
    if (JSON.parse(jsonData).status === 200) {
      response = await clientGetPerfil.getPerfilAdmin(email);
      response = JSON.parse(response);
      return res.status(response.status).send(response);
    }
    return res.status(400).send({
      status: 400,
      message: 'ID not valid',
      idMessage: 9712,
      module: 'client managment',
    });
  } catch (e) {
    /* console.log(e); */
    return res.status(JSON.parse(e).status).send(e);
  }
});

module.exports = clientRouter;
