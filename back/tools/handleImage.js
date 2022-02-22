const { unlink } = require('fs/promises');

/* fonction permettant de récupérer la photo de profil par défaut
de l'utilisateur stockée dans le dossier images/user */
exports.getdefaultUserPicture = (request) => {
  const name = 'default_profile_picture.jpg';
  return `${request.protocol}://${request.get('host')}/images/user/${name}`;
};

exports.handleErrorImage = async (request, location) => {

  const { filename } = request.file;

  try {
    await unlink(`images/${location}/${filename}`);
  }
  catch (err) {
    throw err;
  }

};

exports.deletePreviousUserImage = async (previousPic) => {

  const defaultPic = 'default_profile_picture.jpg';

  // on supprime l'ancienne image du dossier images sauf si c'était la photo par défaut  
  if (previousPic !== defaultPic) {
    try {
      await unlink(`images/user/${previousPic}`);
    }
    catch {
      throw ({ name: "unlink", msg: "La photo précédente n'a pu être supprimée" });
    }
  }

};

exports.deletePreviousPostImage = async (previousPic) => {
  console.log('previous', previousPic);
  try {
    await unlink(`images/post/${previousPic}`);
  }
  catch {
    throw ({ name: "unlink", msg: "La photo précédente n'a pu être supprimée" });
  }

};

exports.deletePreviousCommentImage = async (previousPic) => {
  console.log('previous', previousPic);
  try {
    await unlink(`images/comment/${previousPic}`);
  }
  catch {
    throw ({ name: "unlink", msg: "La photo précédente n'a pu être supprimée" });
  }

};



