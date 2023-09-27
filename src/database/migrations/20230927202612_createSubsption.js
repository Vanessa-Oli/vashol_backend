exports.up = (knex) => {
    return knex.schema.createTable("subscriptions", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("userId").references("id").inTable("users").notNullable();
        table.uuid("eventId").references("id").inTable("events").notNullable();
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable("subscriptions");
};
