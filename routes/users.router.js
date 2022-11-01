const express = require('express');
const router = express.Router();

router.get('/users', (request, response) => {
  const { limit, offset } = request.query;

  if (limit && offset) {
    response.json({ limit, offset })
  } else {
    response.send('No hay parametros')
  }

})

module.exports = router;
