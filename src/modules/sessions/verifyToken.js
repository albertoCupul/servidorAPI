const Jwt = require('jsonwebtoken');
const cfgSessions = require('./cfgSessions');

function verify(token) {
  const cfg = { ...cfgSessions.JwtObj };
  const response = Jwt.verify(token, cfg.secret);
  return response;
}

module.exports.verify = verify;
