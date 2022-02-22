/* permet de parser les données venant d'un formdata pour
le contenu d'un profil utilisateur */
exports.profileParser = (data) => {
  const parsed = JSON.parse(data);
  return {
    username: parsed.username,
    firstname: parsed.firstname,
    lastname: parsed.lastname,
    bio: parsed.bio
  };
};

/* permet de parser les données venant d'un formdata pour
le contenu d'un post ou d'un commentaire */
exports.messageParser = (data) => {
  const parsed = JSON.parse(data);
  return {
    text: parsed.text
  };
};