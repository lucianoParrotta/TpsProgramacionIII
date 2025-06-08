const { DataTypes } = require('sequelize');
const { sequelize } = require('./config/db');

const Paciente = sequelize.define('Paciente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true }
  },
  telefono: {
    type: DataTypes.STRING
  }
});

module.exports = Paciente;