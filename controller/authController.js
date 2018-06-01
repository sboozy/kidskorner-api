const authDB = require('../model/authModel');
const tokenService = require('../services/tokenService');


function registerUser(req, res) {
  console.log(req.body)
  authDB.registerUser(req.body)
  .catch(err => res.status(401).json({
    message: err.message
  }))
  .then(data => tokenService.makeToken({
    id: data.id,
    username: data.username,
    email: data.email,
    pw_hash: data.pw_hash,
    img_url: data.img_url
  }))
  .then(token => {
    res.json({
      token
    })
  })
}

function receiveToken(req, res, next) {
  if (req.headers.authorization) {
    req.authToken = req.headers.authorization.replace(/^Bearer\s/, '');
  }
  next();
}

function loginUser(req, res, next) {
  authDB.loginUser(req.body)
  .catch(err => res.status(401).json({
    status: 'Error',
    message: 'Invalid credentials'
  }))
  .then(data => tokenService.makeToken({
    id: data.id,
    username: data.username,
    email: data.email,
    img_url: data.img_url
  }))
  .then(token => {
    res.json({
      token
    })
  })
}

function restrict (req, res, next) {
  console.log(req)
  tokenService.verify(req.authToken)
  .then(data => {
    console.log("this is auth", data)
    res.locals.user = data;
    next()
  })
  .catch(err => res.status(401).json({
    status: 'Error',
    message: 'Invalid credentials'
  }))
}


module.exports = {
  receiveToken,
  registerUser,
  restrict,
  loginUser
}
