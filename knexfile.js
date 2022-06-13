// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './config/db/dev.sqlite3',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './config/db/migrations',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'better-sqlite3',
    connection: {
      filename: './config/db/prod.sqlite3',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './config/db/migrations',
    },
    useNullAsDefault: true,
  },

};
