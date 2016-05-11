
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),

    // Inserts seed entries
    knex('posts').insert({title: 'this is reddit!', rating: 100, url: 'http://fillmurray.com/200/200' , author_fk: 1}),
    knex('posts').insert({title: 'boooom!', rating: 20, url: 'http://fillmurray.com/200/210', author_fk: 2}),
    knex('posts').insert({title: 'please work', rating: 40, url: 'http://fillmurray.com/210/200', author_fk: 3})
  );
};
