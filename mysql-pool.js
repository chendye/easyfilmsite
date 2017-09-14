// 使用连接池连接数据库
var mysql = require("mysql");
var port = process.env.PORT || 3000; // 设置启动端口

var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moive'
});

var query = function(sql, options, callback) {
  pool.getConnection(function(err, con) {
    if (err) {
      callback(err, null, null);
    } else {
      con.query(sql, options, function(err, results, fields) {
        callback(err, results, fields);
      });
    }
    con.release(); // 释放资源
  });
}

module.exports = query;