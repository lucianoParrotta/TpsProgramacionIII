const jwt = require('jsonwebtoken');

// Usuario de ejemplo
const usuarioDemo = {
  id: '123',
  email: 'admin@clinica.com',
  password: 'Admin12345'
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email === usuarioDemo.email && password === usuarioDemo.password) {
    const token = jwt.sign({ id: usuarioDemo.id, email }, 'secreto123', { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ mensaje: 'Credenciales inválidas' });
};
