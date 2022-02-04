const yup = require('yup');
const { profileParser } = require('../../tools/jsonParser');

const namesRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\s'.-]+$/;
const forbiddenChars = /[$\/<>;]/;

const { handleErrorImage } = require('../../tools/handleErrorImage');

const profileSchema = yup.object().shape({

  username: yup
    .string()
    .required('Champ Requis')
    .test('forbiddenChars', 'Caractère interdit', value => !forbiddenChars.test(value))
    .trim()
    .min(2, 'Le pseudo doit contenir au minimum 2 caractères')
    .max(15, 'Le pseudo de peut pas dépasser 15 caractères'),

  firstname: yup
    .string()
    .required('Champ Requis')
    .matches(namesRegex, 'Le prénom peut contenir : majuscules, minuscules & espaces')
    .trim()
    .min(2, 'Le prénom doit contenir au minimum 2 caractères')
    .max(20, 'Le prénom de peut pas dépasser 15 caractères'),

  lastname: yup
    .string()
    .required('Champ Requis')
    .matches(namesRegex, 'Le nom peut contenir : majuscules, minuscules & espaces')
    .trim()
    .min(2, 'Le nom doit contenir au minimum 2 caractères')
    .max(20, 'Le nom de peut pas dépasser 15 caractères'),

  bio: yup
    .string()
    .test('forbiddenChars', 'Caractère interdit', value => !forbiddenChars.test(value))
    .trim()
    .max(400, 'Le bio de peut pas dépasser 400 caractères'),
});


const profileValid = async (req, res, next) => {

  console.log(req.file);
  const parsedData = profileParser(req.body.userInfos);

  try {
    await profileSchema.validate({ ...parsedData });
    res.locals.newData = parsedData;
    next();
  }
  catch (err) {

    if (req.file) {
      handleErrorImage(req, 'user');
    }
    res.status(400).json({ message: `${err.message} sur le champ ${err.params.path} : ${err.params.value}` });
  }
};

module.exports = profileValid;