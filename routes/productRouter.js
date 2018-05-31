const productRouter = require('express').Router();
const productController = require('../controller/productController');
const responseController = require('../controller/responseController');
const authController = require('../controller/authController');

productRouter.route('/')
  .get(
    authController.restrict,
    productController.getAllProducts,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
    )
  .post(
    authController.restrict,
    productController.createProduct,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
  )

productRouter.route('/:id')
  .get(
    authController.restrict,
    productController.getOneProduct,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
    )
  .put(
    authController.restrict,
    productController.updateProduct,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
    )
  .delete(
    productController.deleteProduct,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
    )

productRouter.route('/user/:id')
  .get(
    authController.restrict,
    productController.getAllProductsForUser,
    responseController.sendOkResponse,
    responseController.sendErrorResponse
    )

module.exports = productRouter
