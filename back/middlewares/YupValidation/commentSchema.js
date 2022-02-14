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
    .min(3, 'Le commentaire doit contenir au minimum 3 caractères')
    .max(500, 'Le commentaire de peut pas dépasser 500 caractères'),

});


const messageValid = async (req, res, next) => {

  const commentInfos = req.body.commentInfos;


  try {
    if (!commentInfos) throw ({ message: 'commentInfos ne peut être vide' });
    const parsedData = messageParser(req.body.commentInfos);
    await postSchema.validate({ ...parsedData });
    res.locals.newData = parsedData;
    next();
  }
  catch (err) {

    if (req.file) handleErrorImage(req, 'comment');
    if (!commentInfos) return res.status(400).json({ message: err.message });

    res.status(400).json({ message: `${err.message} sur le champ ${err.params.path} : ${err.params.value}` });
  }
};

module.exports = messageValid;