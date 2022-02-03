const yup = require('yup');

const namesRegex = /^[a-zA-Z\s'.-]+$/;

const registerSchema = yup.object().shape({
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
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins 1 chiffre'),

  username: yup
    .string()
    .trim()
    .required('Champ Requis')
    .min(2, 'Le pseudo doit contenir au minimum 2 caractères')
    .max(15, 'Le pseudo de peut pas dépasser 15 caractères'),

  firstname: yup
    .string()
    .trim()
    .required('Champ Requis')
    .matches(namesRegex, 'Le prénom peut contenir : majuscules, minuscules & espaces')
    .min(2, 'Le prénom doit contenir au minimum 2 caractères')
    .max(15, 'Le prénom de peut pas dépasser 15 caractères'),

  lastname: yup
    .string()
    .trim()
    .required('Champ Requis')
    .matches(namesRegex, 'Le nom peut contenir : majuscules, minuscules & espaces')
    .min(2, 'Le nom doit contenir au minimum 2 caractères')
    .max(15, 'Le nom de peut pas dépasser 15 caractères'),
});

const registerValid = async (req, res, next) => {
  try {
    await registerSchema.validate({
      ...req.body
    });
    next();
  }
  catch (err) {
    res.status(400).json(err);
  }
};

module.exports = registerValid;


