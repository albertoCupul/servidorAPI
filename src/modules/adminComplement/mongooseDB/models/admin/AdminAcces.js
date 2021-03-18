const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaAdmin = new Schema({
  email: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  loginStatus: { type: Boolean, required: true },
  acountStatus: { type: String, required: true },
  token: String,
},
{
  collection: 'AdminAccess',
});

SchemaAdmin.methods.findAdminByEmail = function (email, fields = null) {
  if (!fields) {
    return mongoose.model('AdminAccess').findOne({ email });
  }
  return mongoose.model('AdminAccess').findOne({ email }, fields);
};

SchemaAdmin.methods.findAllPerfil = function (_id) {
  return mongoose.model('AdminDetail').findOne({ adminAcess: _id }).populate({ path: 'adminAcess', select: ['email', 'pwd', 'acountStatus'] });
};

SchemaAdmin.methods.findAllInfo = function (_id) {
  return mongoose.model('AdminDetail').findOne({ adminAcess: _id }).populate({ path: 'adminAcess' });
};

SchemaAdmin.methods.findOneAndUpdate = function (filter, updateObject, options = { new: true }) {
  return mongoose.model('AdminAccess').findOneAndUpdate(filter, updateObject, options);
};

SchemaAdmin.methods.findOneAndDelete = function (filter) {
  return mongoose.model('AdminAccess').findOneAndDelete(filter).exec();
};

module.exports = mongoose.model('AdminAccess', SchemaAdmin);
