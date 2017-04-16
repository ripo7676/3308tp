var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var bcrypt = require('bcryptjs');

app.use(express.static( __dirname + '/styles'));

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

var test1 = function () {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync("App!3$And0ranges!", salt);
  var comparison = bcrypt.compareSync("App!3$And0ranges!", hash); // true
  if (comparison) {return "Test1 (bcryptjs salt/hash/comparison): Success!"}
  else {"Test1: (bcryptjs salt/hash/comparison): Failure, comparison returned false."}
};

var test2 = function () {
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : 'edo4plet5mhv93s3.cbetxkdyhwsb.us-east-1.rds.amazonaws.con',
    port     : '3306',
    user     : 'ts3vd91emf15m4kd',
    password : 'n92esovs7r8xm80x',
    database : 'gvavvb6s6sprtg2u'
  });
  connection.connect(function(err) {
    console.log(err.code); // 'ECONNREFUSED'
    console.log(err.fatal); // true
  });
  connection.end();
  return "Test2 (MySQL connection): Success!"
};

router.get("/",function(req,res){
  console.log(test1());
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(process.env.PORT||3000 ,function(){
  console.log("Starting tests...");
  console.log("");
  console.log(test1());
  console.log(test2());
  console.log("");
  console.log("All tests finished, please press Ctrl+c to exit.");
});
