const express = require('express');
const router = express.Router();
const { getTurnosPorPaciente, cancelarTurno, crearTurno} = require('../controllers/API/turnosController');
const { verificarToken } = require('../middlewares/auth');

router.get('/:idPaciente', getTurnosPorPaciente);

router.get('/:idPaciente', getTurnosPorPaciente);
router.delete('/:idTurno', cancelarTurno);

module.exports = router;

router.post('/', verificarToken, crearTurno);