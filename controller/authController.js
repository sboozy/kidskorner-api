const authModel = require('../model/authModel');
const tokenService = require('../services/tokenService');

function receiveToken(req, res, next) {
  if (req.headers.authorization) {
    req.authToken = req.headers.authorization.replace(/^Bearer\s/, '');
  }
  next();
}

function registerUser(req, res) {
  authModel.registerUser(req.body)
  .catch(err => res.status(401).json({
    message: 'This email is already in use'
  }))
  .then(data=> tokenService.makeToken({
    username: data.username,
    email: data.email,
    img_url: data.img_url,
    id: data.id
  }))
  .then(token => {
    res.json({
      token
    })
  })
}

function restrict (req, res, next) {
  tokenService.verify(req.authToken)
  .then(data => {
    res.locals.user = data;
    next()
  })
  .catch(err => res.status(401).json({
    status: 'Error',
    message: 'Invalid credentials'
  }))
}

function loginUser(req, res, next) {
  authModel.loginUser(req.body)
  .catch(err => res.status(401).json({
    status: 'Error',
    message: 'Invalid credentials'
  }))
  .then(data => tokenService.makeToken({
    username: data.username,
    email: data.email,
    img_url: data.img_url,
    id: data.id
  }))
  .then(token => {
    res.json({
      token
    })
  })
}

module.exports = {
  receiveToken,
  registerUser,
  restrict,
  loginUser
}
