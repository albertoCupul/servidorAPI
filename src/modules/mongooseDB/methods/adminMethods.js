const model = require('./models/AdminAcces');

function findByEmail(email) {
  try {
    const modelo = model.schemaAdminDetail();
    const finder = modelo.find({ email: 'maxximusgrades@outlook.com' }).exec();
    finder.then((value) => { console.log(value); });
  } catch (e) {
    return false;
  }
}
