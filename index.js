const express = require('express');
const routerApi = require('./routes');
const { errorHandler, logErrors, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')
const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

app.use(logErrors);

app.use(boomErrorHandler);

app.use(ormErrorHandler);

app.use(errorHandler);

app.listen(port, () => console.log('El server esta corriendo en el puerto', port));



