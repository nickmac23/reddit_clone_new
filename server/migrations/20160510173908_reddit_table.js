exports.up = function(knex, Promise) {
   return knex.schema.createTable('authors', function(table){
     table.increments('id');
     table.string('name');
     table.string('password');
   }).then( function() {
     return knex.schema.createTable('comments', function(table){
       table.increments('id');
       table.string('comment');
       table.timestamp('date').defaultTo(knex.fn.now())
       table.integer('author_fk').references('authors.id').onDelete('cascade');
     })
   }).then(function () {
     return knex.schema.createTable('posts', function(table){
       table.increments('id');
       table.string('title');
       table.string('url');
       table.timestamp('date').defaultTo(knex.fn.now());
       table.integer('rating').defaultTo(0);
       table.integer('author_fk').references('authors.id').onDelete('cascade');
       table.integer('comment_fk').references('comments.id').onDelete('cascade');

     })
   })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts')
  .then( function () {
    return knex.schema.dropTable('comments')
  })
  .then( function () {
    return knex.schema.dropTable('authors')
  })
};
