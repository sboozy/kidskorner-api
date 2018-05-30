// Connect so Models have access to database
const db = require('../config/connection.js');
const bcrypt = require ('bcrypt');
const saltRounds = 10


//authorizes user and hashes password before inserting into db
function registerUser(auth) {
  if (!auth.img_url) auth.img_url = "https://i.imgur.com/tPEkpFz.png"
  return bcrypt.hash(auth.pw_hash, saltRounds)
  .then(hash => {
    const newUser = {
      username: auth.username,
      email: auth.email,
      pw_hash: hash,
      img_url: auth.img_url
    }
    // creates new user
    return db.one(`
      INSERT INTO users (username, email, pw_hash, img_url)
      VALUES ($/username/, $/email/, $/pw_hash/, $/img_url/)
      RETURNING *
      `, newUser)
  })
}

//Finds user through email address
function findUserByEmail(email){
  return db.one(`
  SELECT * FROM users
  WHERE email = $1
    `, email)
}

//Attempts user login based on email and matching pw_hash
function loginUser(attempt) {
  return findUserByEmail(attempt.email)
  .then(user => (
    bcrypt.compare(attempt.pw_hash, user.pw_hash)
    .then(match => {
      if (!match) throw new Error ('Login attempt is not valid')
        delete user.password;
      return user;
    })
  ))
}

module.exports = {
  registerUser,
  loginUser
}
