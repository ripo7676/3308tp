var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

app.use(express.static( __dirname + '/styles'));

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/post",function(req,res){
  res.sendFile(path + "post.html");
});

router.get("/settings",function(req,res){
  res.sendFile(path + "settings.html");
});

router.get("/login",function(req,res){
  res.sendFile(path + "login.html");
});

router.post("/login",function(req,res){
  res.sendFile(path + "login.html");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(process.env.PORT||3000 ,function(){
  console.log("Live at Port 3000");
});
