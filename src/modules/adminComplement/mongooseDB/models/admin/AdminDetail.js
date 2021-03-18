const mongoose = require('mongoose');

const { Schema } = mongoose;

const SchemaAdmin = new Schema({
  registerDate: { type: Date, required: true },
  fullName: {
    name: { type: String, required: true },
    lastName1: { type: String, required: true },
    lastName2: String,
  },
  phone: String,
  lastUpdate: Date,
  adminAcess: { type: Schema.Types.ObjectId, required: true, ref: 'AdminAccess' },
},
{
  collection: 'AdminDetail',
});

SchemaAdmin.methods.findOneAndUpdate = function (filter, updateObject, options = { new: true }) {
  return mongoose.model('AdminDetail').findOneAndUpdate(filter, updateObject, options);
};

SchemaAdmin.methods.findOneAndDelete = function (filter) {
  return mongoose.model('AdminDetail').findOneAndDelete(filter).exec();
};

module.exports = mongoose.model('AdminDetail', SchemaAdmin);
