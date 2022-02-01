const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = ((req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];
    req.token = jwt.verify(token, process.env.TOKEN_SECRET);

    if (req.body.UserId && req.body.UserId !== req.token.USER_ID) {
      throw new Error('User Id non valable');
    } else {
      next();
    }

  } catch (err) {
    res.status(401).json({ erreur: 'Requête non authentifiée' });
  }

});