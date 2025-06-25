const Joi = require('joi');

module.exports.appointmentSchema = Joi.object({
    clientName : Joi.string().required(),
    service : Joi.string().required(),
    date : Joi.string().required(),
    time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
    status : Joi.string().required(),
});