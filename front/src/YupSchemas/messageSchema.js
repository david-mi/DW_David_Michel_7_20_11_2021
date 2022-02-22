// LIBRARIES
const yup = require('yup');

// regex pour les caractères interdits
const forbiddenChars = /[$\/<>;]/;

const messageSchema = yup.object().shape({

  text: yup
    .string()
    .required('Champ Requis')
    .test('forbiddenChars', 'Caractère interdit', value => !forbiddenChars.test(value))
    .trim()
    .min(10, 'Le post doit contenir au minimum 10 caractères')
    .max(500, 'Le post de peut pas dépasser 500 caractères'),

});

export default messageSchema;