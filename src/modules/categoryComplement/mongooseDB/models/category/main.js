const mongoose = require('mongoose');

const { Schema } = mongoose;

const childCat = new Schema({
  name: String,
  root: String,
  parent: String,
});

const subMenu = new Schema({
  name: String,
  root: String,
  child: [childCat],
});

const SchemaMenu = new Schema({
  name: { type: String, required: true },
  child: [subMenu],
},
{
  collection: 'categoryMain',
});

SchemaMenu.methods.findOneAndUpdate = function (filter, update) {
  return mongoose.model('categoryMain').findOneAndUpdate(filter, update);
};

SchemaMenu.methods.findOneAndDelete = function (filter) {
  return mongoose.model('categoryMain').findOneAndDelete(filter);
};

SchemaMenu.methods.findRoot = function (filter) {
  return mongoose.model('categoryMain').findOne(filter);
};

SchemaMenu.methods.findAll = function () {
  return mongoose.model('categoryMain').find();
};

module.exports = mongoose.model('categoryMain', SchemaMenu);
