const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/local/turnos'); 
});

module.exports = router;





