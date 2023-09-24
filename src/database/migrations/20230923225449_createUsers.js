exports.up = (knex) =>
    knex.schema.createTable("usuarios", (table) => {
        table.increments("id").primary();
        table.string("nome").nullable();
        table.string("email").nullable();
        table.string("senha").nullable();
        table.timestamp("data_criacao").defaultTo(knex.fn.now());
        table.timestamp("data_atualizacao").defaultTo(knex.fn.now());
    });

exports.down = (knex) => knex.schema.dropTable("usuarios");