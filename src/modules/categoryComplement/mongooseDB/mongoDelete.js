const SchemaMenu = require('./models/category/main');

async function findChildExiste(_id, root) {
  try {
    const Categoria = new SchemaMenu();
    const filter = { _id: root };
    const doc = await Categoria.findRoot(filter);
    if (doc) {
      /* buscando al hijo */
      doc.child.id(_id).remove();
      doc.save();
      return JSON.stringify({
        status: 200,
        message: 'Category deleted succesfull',
        idMessage: 9016,
        module: 'category managment',
      });
    }
    return JSON.stringify({
      status: 404,
      message: 'Category root not found',
      idMessage: 9017,
      module: 'category managment',
    });
  } catch (e) {
    /* console.error(e.message); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9508,
      module: 'category managment',
      detail: e.message,
    });
  }
}

async function findSubChildExiste(_id, root, parent) {
  try {
    const Categoria = new SchemaMenu();
    const filter = { _id: root };
    const doc = await Categoria.findRoot(filter);
    const subDoc = await doc.child.id(parent);
    /* Si existe el padre hijo */
    if (subDoc) {
      const child = await subDoc.child.id(_id).remove();
      if (child) {
        doc.save();
        return JSON.stringify({
          status: 200,
          message: 'Category deleted succesfull',
          idMessage: 9018,
          module: 'category managment',
        });
      }
      return JSON.stringify({
        status: 404,
        message: 'Category not found',
        idMessage: 9019,
        module: 'category managment',
      });
    }
    return JSON.stringify({
      status: 404,
      message: 'Id parent not found',
      idMessage: 9020,
      module: 'category managment',
    });
  } catch (e) {
    /* console.error(e.message); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9508,
      module: 'category managment',
      detail: e.message,
    });
  }
}

async function deleteCat(_id, nivel, root, parent) {
  try {
    const Categoria = new SchemaMenu();
    if (nivel === 0) {
      /* buscando si existe Categoria */
      const filter = { _id };
      const resp = await Categoria.findRoot(filter);
      if (resp) {
        await Categoria.findOneAndDelete(filter);
        return JSON.stringify({
          status: 200,
          message: 'Category deleted succesfull',
          idMessage: 9014,
          module: 'category managment',
        });
      }
      return JSON.stringify({
        status: 404,
        message: 'Category does not exist',
        idMessage: 9015,
        module: 'category managment',
      });
    } if (nivel === 1) {
      /* validando si existe el hijo, sino existe se añade */
      const resp = await findChildExiste(_id, root);
      return resp;
    } if (nivel === 2) {
      const resp = await findSubChildExiste(_id, root, parent);
      return resp;
    }
    return JSON.stringify({
      status: 400,
      message: 'Invalid nivel option',
      idMessage: 9505,
      module: 'category managment',
    });
  } catch (e) {
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9505,
      module: 'category managment',
      detail: e.message,
    });
  }
}

async function deleteCategory(_id, nivel, root, parent) {
  try {
    /* creando copia independiente de los enviados */
    const resp = await deleteCat(_id, nivel, root, parent);
    return resp;
  } catch (e) {
    /* console.log(e.message); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9503,
      module: 'category managment',
    });
  }
}

module.exports.deleteCategory = deleteCategory;
