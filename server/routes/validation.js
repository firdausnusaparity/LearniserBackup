//validation
const Joi = require("@hapi/joi");

//register validation
const registerValidation = data => {
  const schema = Joi.object({
    firstname: Joi.string()
      .min(3)
      .required(),
    lastname: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .trim()
      .min(6)
      .required(),
    birthdate: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female")
  });
  return schema.validate(data);
};

//update Validation
const updateValidation = data => {
  const schema = Joi.object({
    country: Joi.string().required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    school: Joi.string().required(),
    form: Joi.string().required()
  });
  return schema.validate(data);
};

//login validation
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

//admin update user
const adminupdateuser = data => {
  const schema = Joi.object({
    firstname: Joi.string().min(3),
    lastname: Joi.string().min(3),
    password: Joi.string()
      .trim()
      .min(6),
    role: Joi.string().valid("user", "admin")
  });
  return schema.validate(data);
};

//admin update admin's password
const adminupdateadmin = data => {
  const schema = Joi.object({
    Old: Joi.string()
      .trim()
      .min(6),
    New: Joi.string()
      .trim()
      .min(6),
    RetypeNew: Joi.string()
      .trim()
      .min(6)
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;
module.exports.adminupdateuser = adminupdateuser;
module.exports.adminupdateadmin = adminupdateadmin;
