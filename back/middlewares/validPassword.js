module.exports = (req, res, next) => {

  let pw = req.body.password;

  try {
    if (pw.length < 5) throw new Error('Veuillez saisir au minimum 5 caractères !');
    if (!/[a-z]/.test(pw)) throw new Error('Veuillez mettre au moins une minuscule !');
    if (!/[A-Z]/.test(pw)) throw new Error('Veuillez mettre au moins une majuscule !');
    if (!/\d/.test(pw)) throw new Error('Veuillez mettre au moins un chiffre !');

    next();

  } catch (err) {
    res.status(400).json(err.message);
  }

};
