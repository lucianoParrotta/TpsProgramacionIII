// refactorizar a servicios
const {getPacientesModel} = require('./../models/sqlite/paciente.model.js')

// controladores
const getPacientes = async (req, res) => {
    console.log('GET Pacientes',await getPacientesModel());
    res.json(await getPacientesModel());
}
module.exports = {
    getPacientes
}




