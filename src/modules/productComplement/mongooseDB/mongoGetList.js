const CategoryMain = require('./models/category/main');

async function getList() {
  try {
    const Categorias = new CategoryMain();
    const allCategories = await Categorias.findAll();
    /* si hay elementos */
    if (allCategories) {
      return JSON.stringify({
        status: 200,
        message: 'Category Tree',
        idStatus: 9018,
        module: 'category managment',
        detail: allCategories,
      });
    }
    return JSON.stringify({
      status: 200,
      message: 'Not Category found',
      idStatus: 9017,
      module: 'category managment',
      detail: null,
    });
  } catch (e) {
    /* console.error(e.message); */
    return JSON.stringify({
      status: 500,
      message: 'Internar Server Error ',
      idStatus: 9507,
      module: 'category managment',
    });
  }
}

module.exports.getList = getList;
