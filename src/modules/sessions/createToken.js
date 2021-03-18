const Jwt = require('jsonwebtoken');
const cfgSessions = require('./cfgSessions');

function tokenJwt(obj) {
  const cfg = { ...cfgSessions.JwtObj };
  const token = Jwt.sign(obj, cfg.secret, { expiresIn: cfg.expiresIn });
  return token;
}

module.exports.tokenJwt = tokenJwt;
