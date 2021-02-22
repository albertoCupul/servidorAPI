const bcrypt = require('bcrypt');

const saltRounds = 10;

function encryptPwd(password) {
  const hashPwd = bcrypt.hash(password, saltRounds);
  hashPwd.then((hash) => hash);
}

/* function unEncryptPwd(password, hashPwd) {
   console.log('esto se esta mandando   '+password+'    '+hashPwd);
   bcrypt.compare(password, hashPwd).then(function(result) {
     console.log(`son iguales ${password} y el hash ${hashPwd}`);
   })
} */

module.exports.encryptPwd = encryptPwd;
/* module.exports.unEncryptPwd = unEncryptPwd; */
