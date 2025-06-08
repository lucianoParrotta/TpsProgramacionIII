exports.verificarSesion = (req, res, next) => {
  if (req.session && req.session.autenticado) {
    return next();
  }
  return res.redirect('/login');
};