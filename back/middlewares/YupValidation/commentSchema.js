// LIBRARIES 
const yup = require('yup');

// TOOLS
const { messageParser } = require('../../tools/jsonParser');
const { handleErrorImage } = require('../../tools/handleImage');

// regex pour les caractères interdits
const forbiddenChars = /[$\/<>;]/;

// schéma yup pour les données d'un commentaire
const commentSchema = yup.object().shape({

  text: yup
    .string()
    .required('Champ Requis')
    .test('forbiddenChars', 'Caractère interdit', value => !forbiddenChars.test(value))
    .trim()
    .min(3, 'Le commentaire doit contenir au minimum 3 caractères')
    .max(500, 'Le commentaire ne peut pas dépasser 500 caractères'),

});


const messageValid = async (req, res, next) => {

  // champ commentInfos du formData, contenant les données textuelles
  const commentInfos = req.body.commentInfos;

  try {
    /* si le champ commentInfos existe dans la requête, on parse les données 
    et on les valide ou non via le schéma yup. Si la validation est un succès
    on envoie les données dans une variable à laquelle on aura accès dans le controller */
    if (!commentInfos) throw ({ message: 'commentInfos ne peut être vide' });
    const parsedData = messageParser(req.body.commentInfos);
    await commentSchema.validate({ ...parsedData });
    res.locals.newData = parsedData;
    next();
  }
  catch (err) {

    // on va supprimer l'image du dossier associé si la requête en contenait une
    if (req.file) handleErrorImage(req, 'comment');
    if (!commentInfos) return res.status(400).json({ message: err.message });

    res.status(400).json({ message: `${err.message} sur le champ ${err.params.path} : ${err.params.value}` });
  }
};

module.exports = messageValid;