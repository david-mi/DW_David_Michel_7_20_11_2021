const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = ((req, res, next) => {

  try {
    // on vérifie que le token est présent et valide
    const token = req.headers.authorization.split(' ')[1];
    req.token = jwt.verify(token, process.env.TOKEN_SECRET);

    /* si le corps de la requête contient un UserId on vérifie qu'il correspond au 
    USER_ID contenu dans le payload du token */
    if (req.body.UserId && req.body.UserId !== req.token.USER_ID) {
      throw new Error('User Id non valable');
    } else {
      next();
    }

  } catch (err) {
    if (err.name) return res.status(401).json({ message: 'Requête non authentifiée, ' + err.message });
    res.status(401).json(err.message);
  }

});