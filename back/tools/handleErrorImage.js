const { unlink } = require('fs/promises');

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



