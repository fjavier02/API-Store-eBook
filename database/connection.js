//conection whit data base

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        port : '3308',
        user : 'local',
        password : '654321'
     }
});
module.exports = knex