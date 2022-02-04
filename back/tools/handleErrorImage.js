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

exports.deletePreviousImage = async (request, previousPic) => {

  const getdefaultUserPicture = (request) => {
    const name = 'default_profile_picture.jpg';
    return `${request.protocol}://${request.get('host')}/images/user/${name}`;
  };

  const defaultPic = getdefaultUserPicture(request);
  console.log('alllllo');
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


