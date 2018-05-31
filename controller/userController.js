const userDB = require('../models/userModel');

function getAllUsers(req, res, next) {
  userDB.getAllUsers()
  .then(data => {
    res.locals.users = data;
    next();
  })
  .catch(next);
}

function getOneUser(req, res, next) {
  userDB.getOneUser(req.params.id)
  .then(data => {
    res.locals.user = data;
    next()
  })
  .catch(next);
}

function updateUser(req, res, next) {
  req.body.id = req.params.id
  userDB.updateUser(req.body)
  .then(data => {
    res.locals.user = data;
    next();
  })
  .catch(next);
}

function deleteUser(req, res, next) {
  userDB.deleteUser(req.params.id)
  .then(() => {
    next()
  })
  .catch(next);
}

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser
}
