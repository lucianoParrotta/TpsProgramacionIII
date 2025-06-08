const Turno = require('../../models/sqlite/Turno.js');
const turnoSchema = require('../../validators/turnoValidator.js');

//obtener los turnos del paciente
exports.getTurnosPorPaciente = async (req, res) => {
  const { idPaciente } = req.params;

  try {
    const turnos = await Turno.findAll({
      where: { pacienteId: idPaciente }
    });

    if (turnos.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron turnos para este paciente.' });
    }

    res.json(turnos);
  } catch (error) {
    console.error('Error al buscar turnos:', error);
    res.status(500).json({ mensaje: 'Error al buscar turnos.', error });
  }
};

//Cancelar un turno
exports.cancelarTurno = async (req, res) => {
  const { idTurno } = req.params;

  try {
    const turno = await Turno.findByPk(idTurno);

    if (!turno) {
      return res.status(404).json({ mensaje: 'No se encontró el turno con ese ID.' });
    }

    await turno.destroy();

    res.json({ mensaje: 'Turno cancelado correctamente.', turno });
  } catch (error) {
    console.error('Error al cancelar turno:', error);
    res.status(500).json({ mensaje: 'Error al cancelar el turno.' });
  }
};

//Crear un turno
exports.crearTurno = async (req, res) => {
  const { fecha, hora, pacienteId } = req.body;

  const { error } = turnoSchema.validate({ fecha, hora, pacienteId });

  if (error) {
    return res.status(400).json({ mensaje: error.details[0].message });
  }

  try {
    const nuevoTurno = await Turno.create({ fecha, hora, pacienteId });
    res.status(201).json({ mensaje: 'Turno creado con éxito', turno: nuevoTurno });
  } catch (error) {
    console.error('Error al crear turno:', error);
    res.status(500).json({ mensaje: 'Error al crear turno', error });
  }
}

