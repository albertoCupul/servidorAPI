const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaMenu = new Schema({
  titulo: { type: String, required: true },
  precio: {
    iva: { type: Boolean, required: true },
    costo: Schema.Types.Decimal128,
    venta: Schema.Types.Decimal128,
  },
  inventario: {
    administrar: { type: Boolean, required: true },
    existencias: Number,
    minimo: Number,
  },
  categoria: {
    root: { type: Schema.Types.ObjectId, required: true },
    child: Schema.Types.ObjectId,
    subChild: Schema.Types.ObjectId,
  },
},
{
  collection: 'productMain',
});

SchemaMenu.methods.findOne = function (filter) {
  return mongoose.model('productMain').findOne(filter);
};

SchemaMenu.methods.findOneAndUpdate = function (filter, update) {
  return mongoose.model('productMain').findOneAndUpdate(filter, update);
};

SchemaMenu.methods.findOneAndDelete = function (filter) {
  return mongoose.model('productMain').findOneAndDelete(filter);
};

SchemaMenu.methods.findRoot = function (filter) {
  return mongoose.model('productMain').findOne(filter);
};

// SchemaMenu.methods.findAll = function () {
//   return mongoose.model('productMain').find();
// };

// SchemaMenu.methods.findAllPerfil = function (_id) {
//   return mongoose.model('productDetail').findOne({ idProdMain: _id }).populate({ path: 'productMain' });
// };

SchemaMenu.methods.findAllPerfil = function (_id) {
  return mongoose.model('productDetail').findOne({ idProdMain: _id }).populate({ path: 'productMain', select: ['titulo', 'precio'] });
};

module.exports = mongoose.model('productMain', SchemaMenu);
