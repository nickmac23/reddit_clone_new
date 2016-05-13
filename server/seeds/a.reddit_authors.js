
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries

    knex('authors').del(),

  // Inserts seed entries
    knex('authors').insert({name: 'Leonidus', password: '$2a$10$HWt8Ys0wgiIG82ykWZQa6.MtRs7iazCMALxkV3jyjemZjz.cnEJCm'}),
    knex('authors').insert({name: 'Cooper', password: '$2a$10$HWt8Ys0wgiIG82ykWZQa6.MtRs7iazCMALxkV3jyjemZjz.cnEJCm'}),
    knex('authors').insert({name: 'Bud', password: '$2a$10$HWt8Ys0wgiIG82ykWZQa6.MtRs7iazCMALxkV3jyjemZjz.cnEJCm'})
  );
};
