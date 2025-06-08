const Joi = require('joi');

const pacienteSchema = Joi.object({
  nombre: Joi.string().min(2).required().messages({
    'string.base': 'El nombre debe ser texto.',
    'string.min': 'El nombre debe tener al menos 2 caracteres.',
    'any.required': 'El nombre es obligatorio.'
  }),
  apellido: Joi.string().min(2).required().messages({
    'string.base': 'El apellido debe ser texto.',
    'string.min': 'El apellido debe tener al menos 2 caracteres.',
    'any.required': 'El apellido es obligatorio.'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .allow('', null)
    .messages({
      'string.email': 'El email debe tener formato válido (ej: nombre@correo.com).'
    }),
  telefono: Joi.string()
    .pattern(/^[0-9\s\-()+]+$/)
    .allow('', null)
    .messages({
      'string.pattern.base': 'El teléfono solo puede contener números y símbolos como - ( ) +.'
    })
});

module.exports = pacienteSchema;