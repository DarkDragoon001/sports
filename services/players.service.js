const umpireDetails = require('../model').umpireDetails;
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const registerumpire = async function (body) {
  let err, register;
  body['uniqueId'] = uuid.v4();
  body['created'] = new Date();
  body['modified'] = new Date();
  [err, register] = await to(umpireDetails.create(body));
  if (err) {
    console.log('error service', err);
    return TE({ error: 'Failed to register umpire' });
  }
  return register;
}
module.exports.registerumpire = registerumpire;

const registerPlayer = async function (body) {
  let err, register;
  body['uniqueId'] = uuid.v4();
  body['created'] = new Date();
  body['modified'] = new Date();
  [err, register] = await to(umpireDetails.create(body));
  if (err) {
    console.log('error service', err);
    return TE({ error: 'Failed to register umpire' });
  }
  return register;
}
module.exports.registerPlayer = registerPlayer;

const login = async function (body) {
  let loginerr, login, userErr,user;
  if(body?.userName) {
    [loginerr, login] = await to(umpireDetails.findOne({
      where: {
        userName: body.userName
      }
    }));
    if(loginerr) {
      return TE(loginerr.message);
    }
    if(!login) {
      return TE('Invalid Credentials');
    }
  } else {
    return TE('Invalid Email')
  }
  const token = jwt.sign({id: login.id, userName: login.userName}, CONFIG.secretKey, { expiresIn: '24h'});
  [userErr, user] = await to(login.comparePassword(body?.password));
  if(userErr) {
    return TE(userErr.message);
  }
  return { user: {
    uniqueId: user.uniqueId,
    accessToken: token
  }};
}
module.exports.login = login;

const getCurrentUser = async function(req, body) {
  let authHeader = body?.authorization;
  if(authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, CONFIG.secretKey, (err, user) => {
      if (err) {
        return TE('Invalid Token');
      }
      req.user = user;
    });
    if(req.user) {
      return { isUser: true };
    }
  } else {
    return TE('No token provided');
  }
}
module.exports.getCurrentUser = getCurrentUser;