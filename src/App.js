const express = require('express');

const mongoose = require('mongoose');
const db = require('./modules/mongooseDB/models/dbConection');

const dataDB = { ...db.ObjDbConection };

/* configurando modulo express */

const port = 3000;

/* importando modulos propios */

/* const sessions = require('./modules/sessions'); */

const adminRoute = require('./routes/adminRoute');

/* ejecutando modulo express */

const app = express();

/* añadiendo a express el entender Json */

app.use(express.json());

app.use('/administrators', adminRoute);

/* rutas para manejo de usuarios administradores */
try {
  mongoose.connect(dataDB.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: false,
    dbName: dataDB.databaseName,
    user: dataDB.userName,
    pass: dataDB.userPwd,
  });
  /* iniciando localhost */
  app.listen(port, () => {
    console.log(`Ejecutando servidor en puert ${port}`);
  });
} catch (e) {
  console.log('error to connect DB motor');
}
