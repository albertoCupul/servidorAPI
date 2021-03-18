const SchemaMenu = require('./models/category/main');

function buscarNombre(doc, name) {
  let existe = false;
  doc.child.map((item) => {
    if (item.name === name && !existe) {
      existe = true;
    }
    return existe;
  });
  return existe;
}

async function findChildExiste(_id, name, root) {
  try {
    const Categoria = new SchemaMenu();
    const filter = { _id: root };
    const doc = await Categoria.findRoot(filter);
    /* console.log(doc); */
    const existe = buscarNombre(doc, name);
    if (!existe) {
      /* buscando al hijo */
      const subDoc = doc.child.id(_id);
      if (subDoc) {
        subDoc.name = name;
        doc.save();
        return JSON.stringify({
          status: 200,
          message: 'Category updated succesfull',
          idMessage: 9010,
          module: 'category managment',
        });
      }
      return JSON.stringify({
        status: 400,
        message: 'Id category not found',
        idMessage: 9009,
        module: 'category managment',
      });
    }
    return JSON.stringify({
      status: 400,
      message: 'Category already exist',
      idMessage: 9011,
      module: 'category managment',
    });
  } catch (e) {
    /* console.error(e.message); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9506,
      module: 'category managment',
      detail: e.message,
    });
  }
}

async function findSubChildExiste(_id, name, root, parent) {
  try {
    const Categoria = new SchemaMenu();
    const filter = { _id: root };
    const doc = await Categoria.findRoot(filter);
    const subDoc = await doc.child.id(parent);
    const existe = await buscarNombre(subDoc, name);
    /* Si existe el padre hijo */
    if (subDoc) {
      const child = await subDoc.child.id(_id);
      if (!existe) {
        child.name = name;
        doc.save();
        return JSON.stringify({
          status: 200,
          message: 'Category updated succesfull',
          idMessage: 9011,
          module: 'category managment',
        });
      }
      return JSON.stringify({
        status: 400,
        message: 'Category already exist',
        idMessage: 9012,
        module: 'category managment',
      });
    }
    return JSON.stringify({
      status: 404,
      message: 'Id parent not found',
      idMessage: 9013,
      module: 'category managment',
    });
  } catch (e) {
    /* console.error(e.message); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9507,
      module: 'category managment',
      detail: e.message,
    });
  }
}

async function updateCat(info) {
  try {
    const { parent } = info;
    const { name } = info;
    const { nivel } = info;
    const { root } = info;
    const { _id } = info;
    const Categoria = new SchemaMenu();
    if (nivel === 0) {
      /* buscando si existe Categoria */
      const filter = { _id };
      const resp = await Categoria.findRoot(filter);
      if (resp) {
        resp.name = name;
        resp.save();
        return JSON.stringify({
          status: 200,
          message: 'Category updated succesfull',
          idMessage: 9009,
          module: 'category managment',
        });
      }
      return JSON.stringify({
        status: 404,
        message: 'Category does not exist',
        idMessage: 9008,
        module: 'category managment',
      });
    } if (nivel === 1) {
      /* validando si existe el hijo, sino existe se añade */
      const resp = await findChildExiste(_id, name, root);
      return resp;
    } if (nivel === 2) {
      const resp = await findSubChildExiste(_id, name, root, parent);
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

async function updateCategory(infoAdmin) {
  try {
    /* creando copia independiente de los enviados */
    const user = { ...infoAdmin.category };
    const resp = await updateCat(user);
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

module.exports.updateCategory = updateCategory;
