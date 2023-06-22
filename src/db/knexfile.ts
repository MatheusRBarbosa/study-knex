require('ts-node/register');

module.exports = {
  client: 'pg',
  connection: "postgresql://postgres:senha123@localhost",
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migrations'
  },
  timezone: 'UTC'
};