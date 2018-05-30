// Connect so Models have access to database
const db = require('../config/connection.js');

//Get all users
function getAllUsers() {
  return db.any(`
    SELECT * FROM users
  `)
}

//Get one user
function getOneUser(id){
  return db.one(`
    SELECT * FROM users
    WHERE id = $1
  `, id)
}

//Update a user
function updateUser(user) {
  return db.one(`
    UPDATE users
    SET username = $/username/, email = $/email/, pw_hash = $/pw_hash/, img_url = $/img_url/
    WHERE id = $/id/
    RETURNING *
  `, user)
}

//Delete one user
function deleteUser(id) {
  return db.none(`
    DELETE FROM users
    WHERE id = $1
  `, id)
}

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser
}
