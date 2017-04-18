
exports.up = function(knex, Promise) {
  return knex.schema.createTable('links', (table) => {
    table.increments()
    table.string('title')
    table.string('url')
    table.integer('votes').defaultTo(1)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('link')
};
