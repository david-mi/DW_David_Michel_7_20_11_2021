// LIBRARIES
const yup = require('yup');

// TOOLS
const { messageParser } = require('../../tools/jsonParser');
const { handleErrorImage } = require('../../tools/handleImage');

// regex pour les caractères interdits
const forbiddenChars = /[$<>;]/;

// schéma yup pour les données d'un message
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

  // champ postInfos du formData, contenant les données textuelles
  const postInfos = req.body.postInfos;

  try {
    /* si le champ postInfos existe dans la requête, on parse les données 
    et on les valide ou non via le schéma yup. Si la validation est un succès
    on envoie les données dans une variable à laquelle on aura accès dans le controller */
    if (!postInfos) throw ({ message: 'postInfos ne peut être vide' });
    const parsedData = messageParser(req.body.postInfos);
    await postSchema.validate({ ...parsedData });
    res.locals.newData = parsedData;
    next();
  }
  catch (err) {

    // on va supprimer l'image du dossier associé si la requête en contenait une
    if (req.file) handleErrorImage(req, 'post');
    if (!postInfos) return res.status(400).json({ message: err.message });

    res.status(400).json({ message: `${err.message} sur le champ ${err.params.path} : ${err.params.value}` });
  }
};

module.exports = messageValid;