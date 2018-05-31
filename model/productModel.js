// Connect so Models have access to database
const db = require('../config/connection.js');

//Get all products
function getAllProducts() {
  return db.any(`
    SELECT products.id, products.user_id, name, description, price, image_url
    FROM products
  `)
}
    // ORDER BY products.id DESC

function getAllProductsForUser(id) {
  return db.any(`
    SELECT products.id, products.user_id, name, description, price, image_url
    FROM products
    JOIN users
    ON users.id = products.user_id
    WHERE users.id = $1
  `, id)
}

//Get one product
function getOneProduct(id) {
  return db.one(`
    SELECT products.id, products.user_id, name, description, price, image_url
    FROM products
    WHERE products.id = $1
  `, id)
}

//Create a new product
function createProduct(product) {
  if (product.image_url === '') {
    product.image_url = 'https://i.imgur.com/OYtFpHR.png'
  }
  return db.one(`
    INSERT INTO products
    (user_id, name, description, price, image_url)
    VALUES ($/user_id/, $/name/, $/description/, $/price/, $/image_url/)
    RETURNING *
  `, product)
}

//Update a product
function updateProduct(product) {
  if (product.image_url === '') {
    product.image_url = 'https://i.imgur.com/OYtFpHR.png'
  }
  return db.one(`
    UPDATE products
    SET name = $/name/, description = $/description/,
      price = $/price/, image_url = $/image_url/
    WHERE id = $/id/
    RETURNING *
  `, product)
}

//Delete a product
function deleteProduct(id) {
  return db.none(`
    DELETE FROM products
    WHERE id = $1
  `, id)
}

module.exports = {
  getAllProducts,
  getAllProductsForUser,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
