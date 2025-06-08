const express = require('express');
const router = express.Router();
const turnosController = require('../../controllers/local/turnosController');
const Paciente = require('../../models/sqlite/Paciente');

//Ruta para mostrar el formulario de nuevo turno
router.get('/nuevo', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.render('turnos/nuevo', {
      title: 'Crear Turno',
      pacientes,
      valores: {}
    });
  } catch (err) {
    console.error('Error al cargar pacientes:', err);
    res.status(500).send('Error del servidor');
  }
});

//Listado de turnos
router.get('/', turnosController.listarTurnos);

//Formulario para crear un nuevo turno
router.get('/nuevo', (req, res) => {
  res.render('turnos/nuevo', {
    title: 'Nuevo Turno',
    valores: {}
  });
});

//Envío del formulario para crear turno
router.post('/', turnosController.crearTurno);

//Cancelar un turno
router.delete('/:idTurno', turnosController.cancelarTurno);

module.exports = router;

