
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('comments').del(),

    // Inserts seed entries
    knex('comments').insert({comment: 'This is Reddit!', author_fk: 1, post_fk: 1}),
    knex('comments').insert({comment: 'This is Reddit!', author_fk: 1, post_fk: 1}),
    knex('comments').insert({comment: 'This is Reddit!', author_fk: 1, post_fk: 3}),
    knex('comments').insert({comment: 'This is Reddit!', author_fk: 3, post_fk: 3}),
    knex('comments').insert({comment: 'This is Reddit!', author_fk: 2, post_fk: 2}),
    knex('comments').insert({comment: 'This is Reddit!', author_fk: 2, post_fk: 2}),
    knex('comments').insert({comment: 'This is Reddit!', author_fk: 2, post_fk: 2}),
    knex('comments').insert({comment: 'This is Reddit!', author_fk: 2, post_fk: 2}),
    knex('comments').insert({comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ', author_fk: 2, post_fk: 1}),
    knex('comments').insert({comment: 'doogs adn acat are my firend', author_fk: 3, post_fk: 1})
  );
};
