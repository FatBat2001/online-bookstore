const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bookstore',
  port : '3306', // default port
});

connection.connect((err) => {
    if (err) {
      console.error('error connecting: ');
      return;
    }
    console.log("CONNECTED TO MYSQL");
});

module.exports = connection;