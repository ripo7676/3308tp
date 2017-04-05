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
  console.log("");
  console.log("All tests finished, please press Ctrl+c to exit.");
});
