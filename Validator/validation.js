var joi = require('joi');
module.exports = {
    schema: joi.object({
        id : joi.string(),
        firstName : joi.string().required(),
        lastName : joi.string(),
        email : joi.string().email().required(),
        phone: joi.string().min(10).max(10).required(),
        gender : joi.string().valid(['M','F']).required()
    })
};