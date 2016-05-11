
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),

    // Inserts seed entries
    knex('posts').insert({title: '1', rating: 100, author_fk: 1, comment_fk: 1}),
    knex('posts').insert({title: '2', rating: 20, author_fk: 2, comment_fk: 2}),
    knex('posts').insert({title: '3', rating: 40, author_fk: 3, comment_fk: 3})
  );
};
