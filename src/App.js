const express = require('express');

const mongoose = require('mongoose');
const db = require('./modules/adminComplement/mongooseDB/models/dbConection');

mongoose.set('useFindAndModify', false);

const dataDB = { ...db.ObjDbConection };

/* configurando modulo express */

const port = 3000;

/* importando modulos propios */

/* const sessions = require('./modules/sessions'); */

const adminRoute = require('./routes/adminRoute');
const clientRoute = require('./routes/clientRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');

/* ejecutando modulo express */

const app = express();

/* añadiendo a express el entender Json */

app.use(express.json());

app.use('/administrators', adminRoute);
app.use('/client', clientRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);

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
