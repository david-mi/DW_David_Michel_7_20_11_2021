const yup = require('yup');

const loginSchema = yup.object().shape({

  email: yup
    .string()
    .trim()
    .required('Champ Requis')
    .email("L'email n'est pas valide"),

  password: yup
    .string()
    .trim()
    .required('Champ Requis')
    .min(6, `Veuillez mettre au minimum 6 caractères`)
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins 1 minuscule')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins 1 majuscule')
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins 1 chiffre')

});

const loginValid = async (req, res, next) => {
  try {
    await loginSchema.validate({
      ...req.body
    });
    next();
  }
  catch (err) {
    res.status(400).json(err);
  }
};

module.exports = loginValid;