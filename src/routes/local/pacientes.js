const express = require('express');
const router = express.Router();
const pacientesController = require('../../controllers/local/pacienteController');

router.get('/', pacientesController.listarPacientes);

//nuevo paciente
router.get('/nuevo', (req, res) => {
    res.render('pacientes/nuevo', {
        title: 'Nuevo Paciente',
        valores: {}
    });
});

router.post('/', pacientesController.crearPaciente);

router.delete('/:id', pacientesController.eliminarPaciente);

module.exports = router;