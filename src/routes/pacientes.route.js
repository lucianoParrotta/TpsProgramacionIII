const {Router} = require('express');
const {getPacientes} = require('./../controllers/pacientes.controller.js')
const rutaPacientes = Router();
rutaPacientes.get('/', getPacientes);
//Otras rutas CRUD


module.exports = rutaPacientes;