// LIBRARIES
import * as yup from 'yup';

// regex pour les noms et prénoms
const namesRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\s'.-]+$/;
// regex pour les caractères interdits
const forbiddenChars = /[$<>;]/;

// schéma yup pour les données d'un profil
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

// schéma yup pour les données d'un email
const emailSchema = yup.object().shape({
  previousEmail: yup
    .string()
    .trim()
    .required('Champ Requis')
    .email("Format mail non valide"),

  newEmail: yup
    .string()
    .trim()
    .required('Champ Requis')
    .email("Format mail non valide")
});

// schéma yup pour les données d'un mot de passe
const passwordSchema = yup.object().shape({

  previousPw: yup
    .string()
    .required('Champ Requis')
    .test('forbiddenChars', 'Caractère interdit', value => !forbiddenChars.test(value))
    .trim()
    .min(6, `Veuillez mettre au minimum 6 caractères`)
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins 1 minuscule')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins 1 majuscule')
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins 1 chiffre'),

  newPw: yup
    .string()
    .required('Champ Requis')
    .test('forbiddenChars', 'Caractère interdit', value => !forbiddenChars.test(value))
    .trim()
    .min(6, `Veuillez mettre au minimum 6 caractères`)
    .matches(/[a-z]/, 'Le mot de passe doit contenir au moins 1 minuscule')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins 1 majuscule')
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins 1 chiffre'),

});


export { emailSchema, profileSchema, passwordSchema };