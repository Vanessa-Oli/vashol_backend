const path = require("path");
module.exports = {
    development: {
        client: "postgresql",
        connection: {
            host: "localhost",
            port: 5432,
            database: "vashol",
            user: "vanny",
            password: "020408",
        },
        pool: {
            afterCreate: (conn, cb) => {
                conn.query("SET CONSTRAINTS ALL DEFERRED;", cb);
            },
        },
        useNullAsDefault: true,
        migrations: {
            directory: path.resolve(__dirname, "src", "database", "migrations"),
            tableName: "knex_migrations",
        },
        seeds: {
            directory: path.resolve(__dirname, "src", "database", "seeds"),
        },
    },
};