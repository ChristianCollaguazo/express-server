const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;
app.use(express.json());

routerApi(app);

app.listen(port, () => console.log('El server esta corriendo en el puerto', port));



