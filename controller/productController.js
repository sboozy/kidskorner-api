const productDB = require('../model/productModel');

function getAllProductsForUser(req, res, next) {
  productDB.getAllProductsForUser(req.params.id)
  .then(data => {
    res.locals.products = data;
    next();
  })
  .catch(next);
}

function getAllProducts(req, res, next) {
  productDB.getAllProducts()
  .then(data => {
    res.locals.products = data;
    next();
  })
  .catch(next)
}

function getOneProduct(req, res, next) {
  productDB.getOneProduct(req.params.id)
  .then(data => {
    res.locals.product = data;
    next();
  })
  .catch(next);
}

function createProduct(req, res, next) {
  req.body.user_id = req.params.id
  productDB.createProduct(req.body)
  .then(data => {
    res.locals.product = data;
    next();
  })
  .catch(next)
}

function updateProduct(req, res, next) {
  req.body.id = req.params.id
  productDB.updateProduct(req.body)
  .then(data => {
    res.locals.product = data;
    next();
  })
  .catch(next);
}

function deleteProduct(req, res, next) {
  productDB.deleteProduct(req.params.id)
  .then(() => {
    next();
  })
  .catch(next);
}

module.exports = {
  getAllProductsForUser,
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
