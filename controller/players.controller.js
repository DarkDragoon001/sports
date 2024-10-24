const playerService = require('../services/players.service');

const registerumpire = async function (req, res) {
  let err, register;
  [err, register] = await to(playerService.registerumpire(req?.body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { register });
}
module.exports.registerumpire = registerumpire;

const registerPlayer = async function (req, res) {
  let err, register;
  [err, register] = await to(playerService.registerPlayer(req?.body));
  if (err) {
    return ReE(res, err, 422);
  }
  return ReS(res, { register });
}
module.exports.registerPlayer = registerPlayer;

const login = async function (req, res) {
  let err,login;
  [err, login] = await to(playerService.login(req?.body));
  if(err) {
    return ReE(res, err, 422);
  }
  return ReS(res, login );
}
module.exports.login = login;

const currentUser = async function (req, res) {
  let err, currentUser;
  [err, currentUser] = await to(playerService.getCurrentUser(req, req?.headers));
  if(err) {
    return ReE(res, err, 401);
  }
  return ReS(res, currentUser);
}
module.exports.currentUser = currentUser;