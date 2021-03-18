const express = require('express');
const productAdd = require('../modules/productComplement/mongooseDB/mongoAdd');
// const categoryDelete = require('../modules/categoryComplement/mongooseDB/mongoDelete');
// const categoryUpdate = require('../modules/categoryComplement/mongooseDB/mongoUpdate');
// const categoryList = require('../modules/categoryComplement/mongooseDB/mongoGetList');

/* importando modulos propios */

const product = require('../modules/productComplement/managment/managmentProduct');

const categoryRouter = express.Router();

categoryRouter.post('/create/', async (req, res) => {
  try {
    let response;
    const jsonInfo = req.body;
    const jsonData = await product.validarAllInfo(jsonInfo);
    /* console.log(jsonData); */
    const respJson = JSON.parse(jsonData);
    /* la validación es ok */
    if (respJson.status === 200) {
      response = await productAdd.addProduct(jsonInfo);
      response = JSON.parse(response);
      res.status(response.status).send(response);
    } else {
      res.status(respJson.status).send(respJson);
    }
  } catch (e) {
    /* console.log(e); */
    res.status(JSON.parse(e).status).send(e);
  }
});

// categoryRouter.post('/delete', async (req, res) => {
//   try {
//     let response;
//     const jsonInfo = req.body.category;
//     /* añadiendo un name para que pase la validación */
//     const { _id } = jsonInfo;
//     const { root } = jsonInfo;
//     const { parent } = jsonInfo;
//     const { nivel } = jsonInfo;
//     const validId = category.validarOnlyId(_id);
//     const validRoot = category.validarOnlyId(root);
//     const validParent = category.validarOnlyId(parent);
//     let validNivel = false;
//     if (parseInt(nivel, 10) === 1
//     || parseInt(nivel, 10) === 2
//     || parseInt(nivel, 10) === 0) {
//       validNivel = true;
//     }
//
//     /* la validación es ok */
//     if (validId && validRoot && validParent && validNivel) {
//       response = await categoryDelete.deleteCategory(_id, nivel, root, parent);
//       res.status(JSON.parse(response).status).send(response);
//     } else {
//       res.status(404).send(
//         {
//           status: 400,
//           message: 'Validation field error',
//           idMessage: 9017,
//           module: 'category managment',
//           detail: {
//             _id: validId,
//             root: validRoot,
//             parent: validParent,
//             nivel: validNivel,
//           },
//         },
//       );
//     }
//   } catch (e) {
//     /* console.log(e); */
//     res.status(JSON.parse(e).status).send(e);
//   }
// });
//
// categoryRouter.post('/update/', async (req, res) => {
//   try {
//     let response;
//     const jsonInfo = req.body;
//     const jsonData = await category.validarAllInfo(jsonInfo);
//     const idObj = jsonInfo.category._id;
//     const validId = await category.validarOnlyId(idObj);
//     const respJson = JSON.parse(jsonData);
//     const respJsonId = JSON.parse(validId);
//     /* la validación es ok */
//     if (respJson.status === 200 && respJsonId.status === 200) {
//       response = await categoryUpdate.updateCategory(jsonInfo);
//       response = JSON.parse(response);
//       res.status(response.status).send(response);
//     } else {
//       res.status(respJson.status).send(respJson);
//     }
//   } catch (e) {
//     /* console.log(e); */
//     res.status(JSON.parse(e).status).send(e);
//   }
// });
//
// categoryRouter.get('/list', async (req, res) => {
//   try {
//     let resp = await categoryList.getList();
//     resp = JSON.parse(resp);
//     res.status(resp.status).send(resp);
//   } catch (e) {
//     /* console.log(e); */
//     res.status(500).send(
//       {
//         status: 500,
//         message: 'Internal Server Error',
//         idMessage: 9522,
//         module: 'category managment',
//         detail: e.message,
//       },
//     );
//   }
// });

module.exports = categoryRouter;
