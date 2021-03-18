const AdminAccess = require('./models/admin/AdminAcces');
const Bycript = require('../../sessions/encrypt');
const createToken = require('../../sessions/createToken');
const verifyToken = require('../../sessions/verifyToken');

async function validateLogin(email, pwd) {
  try {
    const AccessInfo = new AdminAccess();
    const fields = 'email pwd  loginStatus token';
    const data = await AccessInfo.findAdminByEmail(email, fields);
    if (data) {
      const pwdEncrypt = data.pwd;
      const tokenSession = data.token;
      const { loginStatus } = data;
      const resp = await Bycript.unEncryptPwd(pwd, pwdEncrypt);
      /* preguntando si las contraseñas concuerdan */
      if (resp) {
        /* preguntando si existe un token */
        if (!tokenSession && !loginStatus) {
          /* se crea token */
          /* generando token */
          const token = createToken.tokenJwt({ email, pwd });
          /* actualizando estatus de logueado */
          const filter = { email };
          const objUpdate = { loginStatus: true, token };
          const Schema = new AdminAccess();
          Schema.loginStatus = true;
          const updated = await Schema.findOneAndUpdate(filter, objUpdate);
          if (updated) {
            return JSON.stringify({
              status: 200,
              message: 'Admin login succesfull',
              idMessage: 9006,
              module: 'admin managment',
              detail: updated,
            });
          }
          return JSON.stringify({
            status: 400,
            message: 'Login status updated failed',
            idMessage: 9011,
            module: 'admin managment',
          });
        }
        /* si existe un token */
        /* hay que decodificarlo */
        verifyToken.verify(tokenSession);
        const fieldsReturn = 'email loginStatus token acountStatus';
        const objReturn = await AccessInfo.findAdminByEmail(email, fieldsReturn);
        return JSON.stringify({
          status: 200,
          message: 'Admin login succesfull with token',
          idMessage: 9004,
          module: 'admin managment',
          detail: objReturn,
        });
      }
      return JSON.stringify({
        status: 404,
        message: 'Login failed. Username or password incorrect',
        idMessage: 9012,
        module: 'admin managment',
      });
    }
    return JSON.stringify({
      status: 404,
      message: 'Login failed. Username or password incorrect',
      idMessage: 9013,
      module: 'admin managment',
    });
  } catch (e) {
    /* console.error(e.message); */
    if (e.message === 'invalid token') {
      return JSON.stringify({
        status: 404,
        message: 'Invalid token',
        idMessage: 9512,
        module: 'admin managment',
      });
    }
    return JSON.stringify({
      status: 500,
      message: 'Internal server Error',
      idMessage: 9513,
      module: 'admin managment',
    });
  }
}

module.exports.validateLogin = validateLogin;
