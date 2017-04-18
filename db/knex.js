const config = require('../knexfile.js')


const pg = require('knex')(config['development'])

module.exports = pg
