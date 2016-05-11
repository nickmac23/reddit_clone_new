exports.up = function(knex, Promise) {
   return knex.schema.createTable('authors', function(table){
     table.increments('author_id');
     table.string('name');
     table.string('password');
    }).then(function () {
     return knex.schema.createTable('posts', function(table){
       table.increments('post_id');
       table.string('title');
       table.string('url');
       table.timestamp('date').defaultTo(knex.fn.now());
       table.integer('rating').defaultTo(0);
       table.integer('author_fk').references('authors.author_id').onDelete('cascade');
      })
    }).then( function() {
         return knex.schema.createTable('comments', function(table) {
           table.increments('comment_id');
           table.string('comment');
           table.timestamp('date').defaultTo(knex.fn.now()),
           table.integer('author_fk').references('authors.author_id').onDelete('cascade');
           table.integer('post_fk').references('posts.post_id').onDelete('cascade');
         })
     })
}


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts')
  .then( function () {
    return knex.schema.dropTable('comments')
  })
  .then( function () {
    return knex.schema.dropTable('authors')
  })
};
