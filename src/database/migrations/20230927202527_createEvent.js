exports.up = (knex) => {
    return knex.schema.createTable("events", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.string("title").notNullable().unique();
        table.string("description").notNullable();
        table.timestamp("startDatetime").notNullable();
        table.timestamp("endDatetime").notNullable();
        table.uuid("ownedBy").references("id").inTable("users").notNullable();
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable("events");
};
