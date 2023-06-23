import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("sub_objects", (table: Knex.TableBuilder) => {
    table.increments("id").primary(),
      table.string("name").notNullable(),
      table.integer("object_id").references("id").inTable("objects");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("sub_objects");
}
