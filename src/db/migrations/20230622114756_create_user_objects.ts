import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user_objects', (table: Knex.TableBuilder) => {
        table.increments('id').primary(),
        table.integer('user_id').references('id').inTable('users')
        table.integer('object_id').references('id').inTable('objects')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user_objects');
}

