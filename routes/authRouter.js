const authRouter = require('express').Router();
const authController = require('../controller/authController');


// authRouter.route('/').get(
//   authController.restrict,
//   (req, res) => res.json({
//     user: res.locals.user
//   })
// )

authRouter.route('/register').post(authController.registerUser)
authRouter.route('/login').post(authController.loginUser)

module.exports = authRouter
