
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    
    knex('authors').del(),

  // Inserts seed entries
    knex('authors').insert({name: 'Leonidus', password: 'test'}),
    knex('authors').insert({name: 'Cooper', password: 'test'}),
    knex('authors').insert({name: 'Bud', password: 'test'})
  );
};
