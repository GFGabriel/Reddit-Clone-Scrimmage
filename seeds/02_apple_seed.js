
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(function () {
      // Inserts seed entries
      return knex('comment').insert([
        {id: 1, comment_text: 'Cool Post!', link_id: 1},
        {id: 2, comment_text: 'ur fat', link_id: 1},
        {id: 3, comment_text: 'n00b', link_id: 2}
      ]);
    });
};
