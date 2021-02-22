/* configurando modulo express */

const express = require('express');

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

/* iniciando localhost */

app.listen(port, () => {
  console.log(`Ejecutando servidor en puert ${port}`);
});
