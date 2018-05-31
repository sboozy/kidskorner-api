///////////////////////////////////////////////////////////////

For postman
{
  "username": "dd",
  "email": "dd",
  "pw_hash": "dd"
  "img_url": "dd"
}

///////////////////////////////////////////////////////////////

chatModel

// Connect so Models have access to database
const db = require('../config/connection.js');

// Create a new chat
function createChat(chat) {
  return db.one(`
    INSERT INTO chats
    (sender_id, recipient_id, product_id)
    VALUES ($/sender_id/, $/recipient_id/, $/product_id/)
    RETURNING *
  `, chat)
}

//Get all chats for one User
function getAllChatsForUser(id) {
  return db.any(`
    SELECT sender_id, recipient_id, product_id
    FROM chats
    JOIN users
    WHERE users.id = $1
    ORDER BY chats.id ASC
  `, id)
}

module.exports = {
  createChat,
  getAllChatsForUser
}

///////////////////////////////////////////////////////////////
messageModel

// Connect so Models have access to database
const db = require('../config/connection.js');

function createMessage() {
  return db.one(`

  `)
}

///////////////////////////////////////////////////////////////

