require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DB_development || process.env.DB_production
  },
};
