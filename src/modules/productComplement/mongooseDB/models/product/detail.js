const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaDetalle = new Schema({
  descripcion: String,
  atributos: [{
    nombre: String,
    valor: String,
  }],
  dimensiones: {
    alto: String,
    ancho: String,
    profundo: String,
    peso: String,
  },
  idProdMain: { type: Schema.Types.ObjectId, required: true, ref: 'productMain' },
},
{
  collection: 'productDetail',
});

SchemaDetalle.methods.findOneAndUpdate = function (filter, update) {
  return mongoose.model('productDetail').findOneAndUpdate(filter, update);
};

SchemaDetalle.methods.findOneAndDelete = function (filter) {
  return mongoose.model('productDetail').findOneAndDelete(filter);
};

SchemaDetalle.methods.findRoot = function (filter) {
  return mongoose.model('productDetail').findOne(filter);
};

SchemaDetalle.methods.findAll = function () {
  return mongoose.model('productDetail').find();
};

SchemaDetalle.methods.findOne = function (filter) {
  return mongoose.model('productDetail').findOne(filter);
};

module.exports = mongoose.model('productDetail', SchemaDetalle);
