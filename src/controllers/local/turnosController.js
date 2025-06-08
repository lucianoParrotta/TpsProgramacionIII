const Turno = require('../../models/sqlite/Turno');
const Paciente = require('../../models/sqlite/Paciente');
const turnoSchema = require('../../validators/turnoValidator');

// Listado de turnos
exports.listarTurnos = async (req, res) => {
  try {
    const turnos = await Turno.findAll();
    res.render('turnos/listado', {
      title: 'Listado de Turnos',
      turnos
    });
  } catch (error) {
    console.error('Error al listar turnos:', error);
    res.status(500).send('Error del servidor');
  }
};

// Crear turno (POST)
exports.crearTurno = async (req, res) => {
  const { fecha, hora, pacienteId } = req.body;
  const { error } = turnoSchema.validate({ fecha, hora, pacienteId });

  if (error) {
    const pacientes = await Paciente.findAll();
    return res.status(400).render('turnos/nuevo', {
      title: 'Crear Turno',
      error: error.details[0].message,
      valores: { fecha, hora, pacienteId },
      pacientes
    });
  }


  try {
    const nuevoTurno = await Turno.create({ fecha, hora, pacienteId });
    res.redirect('/local/turnos');
  } catch (err) {
    console.error('Error al guardar turno:', err);
    res.status(500).send('Error del servidor');
  }
};

// Cancelar turno
exports.cancelarTurno = async (req, res) => {
  const { idTurno } = req.params;

  try {
    await Turno.destroy({ where: { id: idTurno } });
    res.redirect('/local/turnos');
  } catch (error) {
    console.error('Error al cancelar turno:', error);
    res.status(500).send('Error al cancelar el turno');
  }
};
