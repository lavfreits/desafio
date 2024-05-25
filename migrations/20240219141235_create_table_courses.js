/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

  return knex.schema.createTable('courses', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description', 1000).notNullable();
    table.integer('category_id')
      .references('id')
      .inTable('categories');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('courses');
};