const Paciente = require('../../models/sqlite/Paciente');
const pacienteSchema = require('../../validators/pacienteValidator');

//lista de pacientes
exports.listarPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.render('pacientes/listado', {
      title: 'Gestión de Pacientes',
      pacientes
    });
  } catch (error) {
    console.error('Error al listar pacientes:', error);
    res.status(500).send('Error al listar pacientes');
  }
};

//crear paciente
exports.crearPaciente = async (req, res) => {
  const { nombre, apellido, email, telefono } = req.body;

  const { error } = pacienteSchema.validate({ nombre, apellido, email, telefono });

  if (error) {
    return res.status(400).render('pacientes/nuevo', {
      title: 'Nuevo Paciente',
      error: error.details[0].message,
      valores: { nombre, apellido, email, telefono }
    });
  }

  try {
    await Paciente.create({ nombre, apellido, email, telefono });
    res.redirect('/local/pacientes');
  } catch (error) {
    console.error('Error al crear paciente:', error);
    res.status(500).render('pacientes/nuevo', {
      title: 'Nuevo Paciente',
      error: 'Hubo un error al guardar el paciente.',
      valores: { nombre, apellido, email, telefono }
    });
  }
};

//eliminar un paciente
exports.eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  try {
    await Paciente.destroy({ where: { id } });
    res.redirect('/local/pacientes');
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    res.status(500).send('Error al eliminar paciente');
  }
};