//TODO: explanation
const pgp = require('pg-promise')();

// Makes object in dbConfig available to connect to
const dbConfig = require('./dbConfig');

// Setting up for deployment in production
function setDatabase() {
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    return pgp(dbConfig);
  } else if (process.end.NODE_ENV === 'production') {
    return pgp(process.env.DATABASE_URL)
  }
}

const db = setDatabase()
module.exports = db
