const userRouter = require('express').Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const responseController = require('../controller/responseController');

userRouter.route('/')
  .get(
    authController.restrict,
    userController.getAllUsers,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
    )

userRouter.route('/:id')
  .get(
    authController.restrict,
    userController.getOneUser,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  )
  .put(
    authController.restrict,
    userController.updateUser,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
    )
  .delete(
    authController.restrict,
    userController.deleteUser,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  )

module.exports = userRouter
