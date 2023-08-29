const Joi = require("joi");

function registerUserValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Der Name muss ein Text-Format haben.",
      "string.empty": "Bitte geben Sie einen Benutzernamen an.",
      "string.required": "Der Name ist ein Pflichtfeld",
    }),
    email: Joi.string().required().email().messages({
      "string.base": "Die-E-Mail muss ein Text-Format haben.",
      "string.empty": "Bitte geben Sie eine E-Mail-Adresse an.",
      "string.email": "Die E-Mail ist keine valide E-Mail-Adresse",
      "string.required": "Die-E-Mail ist ein Pflichtfeld",
    }),
    password: Joi.string().required().min(6).max(255).messages({
      "string.base": "Das Passwort muss ein Text-Format haben.",
      "string.empty": "Bitte tragen Sie ein Password ein.",
      "string.min": "Das Passwort muss mindestens 6 Zeichen haben.",
      "string.max": "Das Passwort darf maximal 255 Zeichen haben.",
      "string.required": "Das Passwort ist ein Pflichtfeld",
    }),
  });
  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    const errorArray = error.details.map((e) => e.message);
    req.error = errorArray;
    next();
  } else {
    req.body = value;
    next();
  }
}

module.exports.registerUserValidation = registerUserValidation;

function loginUserValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required().email().messages({
      "string.base": "Die-E-Mail muss ein Text-Format haben.",
      "string.empty": "Bitte geben Sie eine E-Mail-Adresse an.",
      "string.email": "Die E-Mail ist keine valide E-Mail-Adresse",
      "string.required": "Die-E-Mail ist ein Pflichtfeld",
    }),
    password: Joi.string().required().min(6).max(255).messages({
      "string.base": "Das Passwort muss ein Text-Format haben.",
      "string.empty": "Bitte tragen Sie ein Password ein.",
      "string.min": "Das Passwort muss mindestens 6 Zeichen haben.",
      "string.max": "Das Passwort darf maximal 255 Zeichen haben.",
      "string.required": "Das Passwort ist ein Pflichtfeld",
    }),
  });
  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    const errorArray = error.details.map((e) => e.message);
    req.error = errorArray;
    next();
  } else {
    req.body = value;
    next();
  }
}

module.exports.loginUserValidation = loginUserValidation;

function createBookValidation(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().alphanum().min(3).max(255).required().messages({
      "string.base": "Der Buchtitel muss ein Text-Format haben.",
      "string.alphanum":
        "Bitte verwenden Sie ausschließlich Buchstaben und Zahlen (keine Sonderzeichen).",
      "string.min": "Das Passwort muss mindestens 3 Zeichen haben.",
      "string.max": "Das Passwort darf maximal 255 Zeichen haben.",
      "string.required": "Der Buchtitel ist ein Pflichtfeld",
    }),
    authors: Joi.array().min(3).max(255).required().messages({
      "string.base": "Der Autor muss ein Text-Format haben.",
      "string.min": "Das Passwort muss mindestens 3 Zeichen haben.",
      "string.max": "Das Passwort darf maximal 255 Zeichen haben.",
      "string.required": "Der Buchtitel ist ein Pflichtfeld",
    }),
    genre: Joi.string(),
    published: Joi.date(),
    image: Joi.string(),
    filename: Joi.string(),
    content: Joi.string().regex(/^[|,. a-z0-9]+$/),
    myRating: Joi.number(),
  });
  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    const errorArray = error.details.map((e) => e.message);
    req.error = errorArray;
    next();
  } else {
    req.body = value;
    next();
  }
}

module.exports.createBookValidation = createBookValidation;
