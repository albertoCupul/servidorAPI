const express = require('express');
const db = require('../modules/mongooseDB/mongoAdminAdd');
const adminUpdate = require('../modules/mongooseDB/mongoAdminUpdate');
const adminDelete = require('../modules/mongooseDB/mongoAdminDelete');
const adminGetAccess = require('../modules/mongooseDB/mongoAdminGetAcc');
const adminGetPerfil = require('../modules/mongooseDB/mongoAdminGetPerfil');
const encryp = require('../modules/sessions');

/* importando modulos propios */

const userAdmin = require('../modules/managmentAdmin/managmentUserAdmin');

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
      if (JSON.parse(response).status === 201) {
        /* guardando el detallado del perfil admin */
        res.status(JSON.parse(response).status).send(response);
      } else {
        /* el email ya existe o hubo un error */
        res.status(JSON.parse(response).status).send(response);
      }
    } else {
      res.status(respJson.status).send(respJson);
    }
  } catch (e) {
    /* console.log(e); */
    res.status(JSON.parse(e).status).send(e);
  }
});

adminRouter.post('/update/:collection', async (req, res) => {
  try {
    let response;
    const jsonInfoAdmin = req.body;
    const { collection } = req.params;
    let jsonData;
    if (collection === 'login' || collection === 'perfil') {
      if (collection === 'login') {
        jsonData = await userAdmin.validarAdminAccesInfo(jsonInfoAdmin);
        const respJson = JSON.parse(jsonData);
        /* la validación es ok */
        if (respJson.status === 200) {
          response = await adminUpdate.updateAdmin(jsonInfoAdmin, collection);
          if (JSON.parse(response).status === 201) {
            /* actualizado el acceso del perfil admin */
            res.status(JSON.parse(response).status).send(response);
          } else {
            /* hubo un error al actualizar el perfil */
            res.status(JSON.parse(response).status).send(response);
          }
        } else {
          res.status(respJson.status).send(respJson);
        }
      } else {
        jsonData = await userAdmin.validarAdminPerfil(jsonInfoAdmin);
        const respJson = JSON.parse(jsonData);
        /* la validación es ok */
        if (respJson.status === 200) {
          response = await adminUpdate.updateAdmin(jsonInfoAdmin, collection);
          if (JSON.parse(response).status === 201) {
            /* actualizado detallado del perfil admin */
            res.status(JSON.parse(response).status).send(response);
          } else {
            /* hubo un error al actualizar el perfil */
            res.status(JSON.parse(response).status).send(response);
          }
        } else {
          res.status(respJson.status).send(respJson);
        }
      }
    } else {
      const resp = {
        status: 400,
        message: 'Collection error to update',
        idMessage: 9502,
      };
      res.status(resp.status).send(resp);
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
      /* console.log(JSON.parse(response)); */
      if (JSON.parse(response).status === 200) {
        /* guardando el detallado del perfil admin */
        res.status(JSON.parse(response).status).send(response);
      } else {
        res.status(JSON.parse(response).status).send(response);
      }
    } else {
      res.status(response.status).send(response);
    }
  } catch (e) {
    /* console.log(e); */
    res.status(JSON.parse(e).status).send(e);
  }
});

adminRouter.get('/:option/:key', async (req, res) => {
  try {
    let response;
    const { option } = req.params;
    const { key } = req.params;
    let jsonData = null;
    switch (option) {
      case 'access':
        jsonData = await userAdmin.validarOnlyEmail(key);
        if (JSON.parse(jsonData).status === 200) {
          /* extraemos informacion */
          response = await adminGetAccess.getAccessAdmin(key);
          return res.status(JSON.parse(response).status).send(response);
        }
        return res.status(200).send({ status: 200, message: 'Email not fund' });
      case 'perfil':
        jsonData = await userAdmin.validarOnlyId(key);
        if (JSON.parse(jsonData).status === 200) {
          response = await adminGetPerfil.getPerfilAdmin(key);
          return res.status(JSON.parse(response).status).send(response);
        }
        return res.status(400).send({ status: 400, message: 'ID not valid' });
      default:
        return res.status(400).send({ status: 400, message: 'Option not valid' });
    }
  } catch (e) {
    /* console.log(e); */
    return res.status(JSON.parse(e).status).send(e);
  }
});

adminRouter.get('/:id', async (req, res) => {
  const { d } = req.params;
  const pwd = encryp
});

module.exports = adminRouter;
