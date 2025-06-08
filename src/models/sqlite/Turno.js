const { DataTypes } = require('sequelize');
const { sequelize } = require('./config/db'); 

const Turno = sequelize.define('Turno', {
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pacienteId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Turno;
