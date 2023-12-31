import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('profiles', (table: Knex.TableBuilder) => {
        table.increments('id').primary(),
        table.string('name').notNullable()
        table.integer('user_id').references('id').inTable('users')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('profiles');
}

