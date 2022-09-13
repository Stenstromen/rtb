const mysql = require("mysql");

const hostName = process.env.MYSQL_HOSTNAME;
const dataBase = process.env.MYSQL_DATABASE;
const userName = process.env.MYSQL_USERNAME;
const passWord = process.env.MYSQL_PASSWORD;

const con = mysql.createConnection({
  host: hostName,
  database: dataBase,
  user: userName,
  password: passWord,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  let sql =
    "CREATE TABLE burntable (id INT AUTO_INCREMENT PRIMARY KEY, messageId VARCHAR(255), messageEnc VARCHAR(255), messageIv VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) {
        console.log("Table 'burntable' already exists")
        return;
    }
    console.log("Table created");
  });
});

module.exports = con;
