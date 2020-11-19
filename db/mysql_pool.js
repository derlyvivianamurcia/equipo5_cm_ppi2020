var mysql = require('mysql');
const util = require('util');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host:process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  multipleStatements:true
});

pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

pool.query = util.promisify(pool.query)

module.exports =  {connection: pool}