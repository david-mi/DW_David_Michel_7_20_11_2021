const yup = require('yup');
const { profileParser } = require('../../tools/jsonParser');

const namesRegex = /^[a-zA-Z\s'.-]+$/;

const profileSchema = yup.object().shape({

  // picture: yup
  //   .mixed(),

  username: yup
    .string()
    .required('Champ Requis')
    .trim()
    .min(2, 'Le pseudo doit contenir au minimum 2 caractères')
    .max(15, 'Le pseudo de peut pas dépasser 15 caractères'),

  firstname: yup
    .string()
    .required('Champ Requis')
    .trim()
    .matches(namesRegex, 'Le prénom peut contenir : majuscules, minuscules & espaces')
    .min(2, 'Le prénom doit contenir au minimum 2 caractères')
    .max(15, 'Le prénom de peut pas dépasser 15 caractères')
    .notRequired(),

  lastname: yup
    .string()
    .required('Champ Requis')
    .trim()
    .matches(namesRegex, 'Le nom peut contenir : majuscules, minuscules & espaces')
    .min(2, 'Le nom doit contenir au minimum 2 caractères')
    .max(15, 'Le nom de peut pas dépasser 15 caractères'),

  bio: yup
    .string()
    .trim()
    .min(2, 'La bio doit contenir au minimum 2 caractères')
    .max(400, 'Le bio de peut pas dépasser 400 caractères'),
});

const profileValid = async (req, res, next) => {
  const parsedData = JSON.parse(req.body.userInfos);

  try {
    await profileSchema.validate({
      ...parsedData
    });
    res.locals.newData = parsedData;
    next();
  }
  catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = profileValid;