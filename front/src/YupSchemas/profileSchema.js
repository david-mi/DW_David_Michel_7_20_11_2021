import * as yup from 'yup';

const namesRegex = /^[a-zA-Z\s'.-]+$/;

const profileSchema = yup.object().shape({

  // picture: yup
  //   .mixed(),

  username: yup
    .string()
    .trim()
    .min(2, 'Le pseudo doit contenir au minimum 2 caractères')
    .max(15, 'Le pseudo de peut pas dépasser 15 caractères'),

  firstname: yup
    .string()
    .trim()
    .matches(namesRegex, 'Le prénom peut contenir : majuscules, minuscules & espaces')
    .min(2, 'Le prénom doit contenir au minimum 2 caractères')
    .max(15, 'Le prénom de peut pas dépasser 15 caractères')
    .notRequired(),

  lastname: yup
    .string()
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

export default profileSchema;