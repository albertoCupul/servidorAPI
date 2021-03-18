const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaClient = new Schema({
  registerDate: { type: Date, required: true },
  fullName: {
    name: { type: String, required: true },
    lastName1: { type: String, required: true },
    lastName2: String,
  },
  phone: String,
  birthday: Date,
  rfc: String,
  address: String,
  references: String,
  lastUpdate: Date,
  clientAcess: { type: Schema.Types.ObjectId, required: true, ref: 'AdminAccess' },
},
{
  collection: 'ClientDetail',
});

SchemaClient.methods.findOneAndUpdate = function (filter, updateObject, options = { new: true }) {
  return mongoose.model('ClientDetail').findOneAndUpdate(filter, updateObject, options);
};

SchemaClient.methods.findOneAndDelete = function (filter) {
  return mongoose.model('ClientDetail').findOneAndDelete(filter).exec();
};

module.exports = mongoose.model('ClientDetail', SchemaClient);
