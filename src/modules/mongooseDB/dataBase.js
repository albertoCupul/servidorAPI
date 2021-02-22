const mongoose = require('mongoose');

function ObjDbConection() {
  this.userName = 'root_store';
  this.userPwd = 'a9902300!#';
  this.databaseName = 'store_copece';
  this.url = 'mongodb://104.192.4.239:27017';
}

async function testConnection(url, { userName, userPwd, databaseName }) {
  try {
    await mongoose.connect(url, {
      dbName: databaseName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: userName,
      pass: userPwd,
    });
    /* console.log('Connected'); */
    return true;
  } catch (e) {
    /* console.log('Error to connect'); */
    return false;
  }
}

async function connect() {
  try {
    const infoDbConnect = new ObjDbConection();
    const db = await mongoose.connect(infoDbConnect.url, {
      dbName: infoDbConnect.databaseName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: infoDbConnect.userName,
      pass: infoDbConnect.userPwd,
    });
    /* console.log(db.connection.db);
    console.log('Connected'); */
    return db;
  } catch (e) {
    /* console.log('Error to connect'); */
    return null;
  }
}

module.exports.testConnection = testConnection;
module.exports.connect = connect;