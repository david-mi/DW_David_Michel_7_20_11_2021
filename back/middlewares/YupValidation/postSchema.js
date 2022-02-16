const yup = require('yup');
const { messageParser } = require('../../tools/jsonParser');

const forbiddenChars = /[$\/<>;]/;

const { handleErrorImage } = require('../../tools/handleErrorImage');

const postSchema = yup.object().shape({

  text: yup
    .string()
    .required('Champ Requis')
    .test('forbiddenChars', 'Caractère interdit', value => !forbiddenChars.test(value))
    .trim()
    .min(10, 'Le post doit contenir au minimum 10 caractères')
    .max(500, 'Le post ne peut pas dépasser 500 caractères'),

});


const messageValid = async (req, res, next) => {

  const postInfos = req.body.postInfos;


  try {
    if (!postInfos) throw ({ message: 'postInfos ne peut être vide' });
    const parsedData = messageParser(req.body.postInfos);
    await postSchema.validate({ ...parsedData });
    res.locals.newData = parsedData;
    next();
  }
  catch (err) {

    if (req.file) handleErrorImage(req, 'post');
    if (!postInfos) return res.status(400).json({ message: err.message });

    res.status(400).json({ message: `${err.message} sur le champ ${err.params.path} : ${err.params.value}` });
  }
};

module.exports = messageValid;