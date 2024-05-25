/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.integer('course_id')
      .references('id').inTable('courses');
    table.enum('role', ['admin', 'common_user', 'professor'])
      .notNullable().defaultTo('common_user');
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};