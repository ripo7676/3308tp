var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser')
var path = __dirname + '/views/';

app.use(express.static( __dirname + '/styles'));
app.use(bodyParser.json());           // For parsing JSON post data
app.use(bodyParser.urlencoded({extended: true})); // Also needed for post data

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

app.post("/login",function(req, res, next) {
  var user = req.body.user;
  if (user === undefined || user['name'] !== 'username' || user['pass'] !== 'password') {
          res.statusCode = 401;
          res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
          res.end('Unauthorized');
  }
  else {
  	var NodeSession = require('node-session'); // Found on https://github.com/quorrajs/NodeSession
  	var result=''; //Result will store a random 32 character string
  	var chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' //Needed to generate random string
  	for (var i=0;i<32;i++) result = result + chars[Math.floor(Math.random()*66)] // Random string generation. 66 is the length of chars
  	session = new NodeSession({secret: result});
  	session.startSession(req, res, next)
    session.username = user['name'];
  	//req.session.push(user); //Should push the username onto the session.username variable
    console.log("A session has been created!\n")
    console.log(session)
    res.redirect('/');
  }
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(process.env.PORT||3000 ,function(){
  console.log("Live at Port 3000");
});
