//npm install express-basic-auth

var app = require('express')()
var basicAuth = require('express-basic-auth')

app.use(basicAuth({
    users: {
        'admin': 'schnerp',
        'tyler': 'password1234',
        'patrick': 'asdfghjkl',
	'morgan': 'abc12345',
	'josh': 'monkey',
	'richard': 'orangeapples'
    }
}))

//More dynamic Asyn attempt/test
/*
app.use(basicAuth({
    authorizer: myAsyncAuthorizer,
    authorizeAsync: true
}))
 
function myAsyncAuthorizer(username, password, cb) {
    if(username.startsWith('p') && password.startsWith('abc'))
        return cb(null, true)	//call-back error response node.js check
    else
        return cb(null, false)
}
*/