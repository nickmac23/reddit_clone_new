require('dotenv').config({path:__dirname + '/.env'});

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DB_development || process.env.DB_production
  },
};
