const pg = require('./knex.js')

function getAll() {
  return pg('links').select().orderBy('votes', 'desc')
}

function getComments() {
  return pg('comment').select()
}

function sortArray(data, array) {
  console.log(data)
  let id = 1
  let miniArray = []
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].id)
    if (data[i].id === id) {
      console.log('match');
      miniArray.push(data[i])
      id = data[i].id
    } else {
      console.log('no match');
      array.push(miniArray)
      miniArray = []
      miniArray.push(data[i])
    }
  }
}

function add(obj) {
  return pg('links').insert(obj)
}

function upVote(id) {
  return pg('links').where('id', '=', id).increment('votes', 1)
}

function downVote(id) {
  return pg('links').where('id', '=', id).decrement('votes', 1)
}

module.exports = {
  getAll, getComments, sortArray, add, upVote, downVote
}
