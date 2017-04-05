//version 4.0+ express test

app.use(function(req, res, next) {
    var user = auth(req);

    if (user === undefined || user['name'] !== 'username' || user['pass'] !== 'password') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
        res.end('Unauthorized');
    } else {
	var NodeSession = require('node-session'); // Found on https://github.com/quorrajs/NodeSession
	var result=' '; //Result will store a random 32 character string
	var chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' //Needed to generate random string
	for (var i=0;i<32;i++) result = result + chars[Math.floor(Math.random()*66) // Random string generation. 66 is the length of chars
	session = new NodeSession({secret: result});
	session.startSession(req, res, callback)
	req.session.put('username');
	req.session.push(user); //Should push the username onto the session.username variable 
        next(); //continue instance
    }
});