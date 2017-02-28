//version 4.0+ express test

app.use(function(req, res, next) {
    var user = auth(req);

    if (user === undefined || user['name'] !== 'username' || user['pass'] !== 'password') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
        res.end('Unauthorized');
    } else {
        next(); //continue instance
    }
});