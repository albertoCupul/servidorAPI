/* function ErrorGlobal(error, detail, adminInfo) {
  const objJson = {
    code: error,
    detail1: detail,
    key: adminInfo,
  };
  return objJson;
} */

function ErrorGlobal(error, detail, adminInfo) {
  this.code = error;
  this.detail1 = detail;
  this.key = adminInfo;
}

function RespAddAdminError(adminInfo) {
  const error = '601';
  const detail = 'Some of the required fields is not correct';
  const objJson = new ErrorGlobal(error, detail, adminInfo);

  /* const errorDetail = new ErrorGlobal(error, detail, adminInfo); */

  return objJson;
}

/* RespAddAdminError.prototype = new ErrorGlobal({
  Error: '601',
}); */

module.exports.RespAddAdminError = RespAddAdminError;
