const express = require('express');

/* importando modulos propios */

const userAdmin = require('../modules/managmentUserAdmin');

const adminRouter = express.Router();

adminRouter.post('/', async (req, res) => {
  const jsonInfoAdmin = req.body;
  const jsonData = await userAdmin.validarAllInfoAdmin(jsonInfoAdmin);
  res.json(jsonData);
});

module.exports = adminRouter;
