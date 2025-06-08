const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { title: 'Iniciar Sesión', error: null });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@clinica.com' && password === 'Admin12345') {
    req.session.autenticado = true;
    return res.redirect('/local/turnos');
  }

  res.status(401).render('login', { title: 'Iniciar Sesión', error: 'Credenciales inválidas' });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;