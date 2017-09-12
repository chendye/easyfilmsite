var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'moive'
});

connection.connect(); // 连接数据库

var port = process.env.PORT || 3000; // 设置启动端口
var app = express();
console.log(port);

app.set('views', path.join(__dirname, 'views/pages')); // 设置模板引擎 app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/src', express.static(path.join(__dirname, 'src'))); // 指定静态资源目录
app.listen(port, '127.0.0.1');

// index page
app.get('/', function(req, res) {
  // 查询所有数据内容
  connection.query('SELECT * FROM moive_data', function(error, results, fields) {
    if (error) {
      console.log(error);
      connection.end();
    } else {
      res.render('index', {
        title: '电影网首页',
        moive: results
      });
    }
  });
});

// detail page
app.get('/moive/:id', function(req, res) {
  let id = req.params.id;

  connection.query(`SELECT * from moive_data WHERE _id = ${id}`, function(error, results, fields) {
    if (error) {
      console.log(error);
      connection.end();
    } else {
      res.render('detail', {
        title: '电影网详情页' + results[0].title,
        moive: results[0]
      });
    }
  });
});

// list page
app.get('/admin/list', function(req, res) {
  connection.query('SELECT * FROM moive_data', function(error, results, fields) {
    if (error) {
      console.log(error);
      connection.end();
    } else {
      res.render('list', {
        title: '电影网列表页',
        moive: results
      });
    }
  });
});

// admin page
app.get('/admin/moive', function(req, res) {
  res.render('admin', {
    title: '电影网录入页',
    moive: [{
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      language: '',
      flash: '',
      summary: ''
    }]
  });
});

// 添加数据
app.post('/admin/add', (req, res) => {
  let [title, doctor, country, year, poster, language, flash, summary] = [req.body.title, req.body.doctor, req.body.country, req.body.year, req.body.poster, req.body.language, req.body.flash, req.body.summary];

  connection.query(`insert into moive_data values (null,${title},${doctor},${country},${year},${poster},${language},${flash},${summary})`, function(error, results, fields) {
    if (error) {
      console.log(error);
      connection.end();
    } else {
      console.log('add: ', results);
    }
  });
});

// 删除数据
app.delete('/admin/list', function(req, res) {
  let id = req.body.id;
  console.log(id);

  connection.query(`delete from moive_data where _id = ${id}`, function(error, results, fields) {
    if (error) {
      console.log(error);
      connection.end();
    } else {
      console.log('delete: ', results);
      res.redirect("/admin/list"); // 刷新页面，重定向到本页面
    }
  });
});