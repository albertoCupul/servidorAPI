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

async function findChildExiste(name, root) {
  try {
    const Categoria = new SchemaMenu();
    const filter = { _id: root };
    const doc = await Categoria.findRoot(filter);
    /* console.log(doc); */
    const existe = buscarNombre(doc, name);
    if (!existe) {
      const newChild = {
        name,
        root,
      };
      doc.child.push(newChild);
      doc.save();
      return JSON.stringify({
        status: 201,
        message: 'Category saved succesfull',
        idMessage: 9000,
        module: 'category managment',
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'Category already exist',
      idMessage: 9001,
      module: 'category managment',
    });
  } catch (e) {
    /* console.error(e.message); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9503,
      module: 'category managment',
      detail: e.message,
    });
  }
}

async function findSubChildExiste(name, root, parent) {
  try {
    const Categoria = new SchemaMenu();
    const filter = { _id: root };
    const doc = await Categoria.findRoot(filter);
    const subDoc = await doc.child.id(parent);
    /* Si existe el padre hijo */
    if (subDoc) {
      const existe = await buscarNombre(subDoc, name);
      if (!existe) {
        const newChild = {
          name,
          root,
          parent,
        };
        subDoc.child.push(newChild);
        doc.save();
        return JSON.stringify({
          status: 201,
          message: 'Category saved succesfull',
          idMessage: 9004,
          module: 'category managment',
        });
      }
      return JSON.stringify({
        status: 200,
        message: 'Category already exist',
        idMessage: 9005,
        module: 'category managment',
      });
    }
    return JSON.stringify({
      status: 404,
      message: 'Id parent not found',
      idMessage: 9006,
      module: 'category managment',
    });
  } catch (e) {
    /* console.error(e.message); */
    return JSON.stringify({
      status: 500,
      message: 'Internal Server Error',
      idMessage: 9504,
      module: 'category managment',
      detail: e.message,
    });
  }
}

async function newCat(info) {
  try {
    const { parent } = info;
    const { name } = info;
    const { nivel } = info;
    const { root } = info;
    const Categoria = new SchemaMenu();
    if (nivel === 0) {
      /* buscando si existe Categoria */
      const filter = { name };
      const resp = await Categoria.findRoot(filter);
      /* console.log(resp); */
      if (!resp) {
        Categoria.name = name;
        Categoria.save();
        return JSON.stringify({
          status: 201,
          message: 'Category saved succesfull',
          idMessage: 9002,
          module: 'category managment',
        });
      }
      return JSON.stringify({
        status: 200,
        message: 'Category already exist',
        idMessage: 9003,
        module: 'category managment',
      });
    } if (nivel === 1) {
      /* validando si existe el hijo, sino existe se añade */
      const resp = await findChildExiste(name, root);
      return resp;
    } if (nivel === 2) {
      const resp = await findSubChildExiste(name, root, parent);
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

async function addCategory(infoAdmin) {
  try {
    /* creando copia independiente de los enviados */
    const user = { ...infoAdmin.category };
    /* console.log(`Estos es user  ${user}`); */
    const resp = await newCat(user);
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

module.exports.addCategory = addCategory;
