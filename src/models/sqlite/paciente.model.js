const {Paciente} = require('../sqlite/entities/paciente.entity.js');

//refactorizar a conexion a base de datos
// Sincronizar base de datos

  const getPacientesModel =  ()=>{
    const users = Paciente.findAll();
    return users;
  }

  module.exports = {
    getPacientesModel
  }
