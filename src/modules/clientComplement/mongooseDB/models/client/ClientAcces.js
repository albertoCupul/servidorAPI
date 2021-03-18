const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaClient = new Schema({
  email: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  loginStatus: { type: Boolean, required: true },
  acountStatus: { type: String, required: true },
  token: String,
},
{
  collection: 'ClientAccess',
});

SchemaClient.methods.findAdminByEmail = function (email, fields = null) {
  if (!fields) {
    return mongoose.model('ClientAccess').findOne({ email });
  }
  return mongoose.model('ClientAccess').findOne({ email }, fields);
};

SchemaClient.methods.findAllPerfil = function (_id) {
  return mongoose.model('ClientDetail').findOne({ clientAcess: _id }).populate({ path: 'clientAcess', select: ['email', 'pwd', 'acountStatus'] });
};

SchemaClient.methods.findAllInfo = function (_id) {
  return mongoose.model('ClientDetail').findOne({ adminAcess: _id }).populate({ path: 'adminAcess' });
};

SchemaClient.methods.findOneAndUpdate = function (filter, updateObject, options = { new: true }) {
  return mongoose.model('ClientAccess').findOneAndUpdate(filter, updateObject, options);
};

SchemaClient.methods.findOneAndDelete = function (filter) {
  return mongoose.model('ClientAccess').findOneAndDelete(filter).exec();
};

module.exports = mongoose.model('ClientAccess', SchemaClient);
