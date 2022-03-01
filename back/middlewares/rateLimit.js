const rateLimit = require("express-rate-limit");
const minutes = 10;

/// va limiter le nombre de tentatives de connexions par ip
module.exports = rateLimit({
  /// réglé sur 15 minutes et 5 essais
  windowMs: minutes * 60 * 1000,
  max: 15,
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    return res.status(429).json({
      error: `You avez dépassé le nombre maximal de requêtes (${req.rateLimit.limit}). Veuillez attendre ${minutes} minutes`
    });
  }
});