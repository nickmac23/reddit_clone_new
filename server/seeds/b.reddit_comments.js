
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('comments').del(),

    // Inserts seed entries
    knex('comments').insert({comment: '1', author_fk: 1}),
    knex('comments').insert({comment: '2', author_fk: 2}),
    knex('comments').insert({comment: '3', author_fk: 3})
  );
};
