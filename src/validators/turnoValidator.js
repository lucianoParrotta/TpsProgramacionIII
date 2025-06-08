const Joi = require('joi');

const turnoSchema = Joi.object({
  fecha: Joi.date().iso().required().messages({
    'any.required': 'La fecha es obligatoria.',
    'date.base': 'La fecha debe ser válida.',
  }),
  hora: Joi.string().required().messages({
    'any.required': 'La hora es obligatoria.'
  }),
  pacienteId: Joi.number().integer().positive().required().messages({
  'any.required': 'Debe seleccionar un paciente.',
  'number.base': 'Debe seleccionar un paciente válido.',
  'number.positive': 'El ID del paciente debe ser un número positivo.'
  })
});

module.exports = turnoSchema;