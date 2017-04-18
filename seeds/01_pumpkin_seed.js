
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('links').del()
    .then(function () {
      // Inserts seed entries
      return knex('links').insert([
        {id: 1, title: 'google',
        url: 'https://www.google.com'
          },
        {id: 2, title: 'blizzard', url: 'https://us.battle.net/en/'},
      ]);
    });
};
