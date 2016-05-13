require('dotenv').config({path:__dirname + '/.env'});

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || process.env.DB_production
  },
};
