// LIBRARIES
const yup = require('yup');

// regex pour les caractères interdits
const forbiddenChars = /[$\/<>;]/;

const commentSchema = yup.object().shape({

  text: yup
    .string()
    .required('Champ Requis')
    .test('forbiddenChars', 'Caractère interdit', value => !forbiddenChars.test(value))
    .trim()
    .min(3, 'Le commentaire doit contenir au minimum 3 caractères')
    .max(500, 'Le commentaire ne peut pas dépasser 500 caractères'),

});

export default commentSchema;