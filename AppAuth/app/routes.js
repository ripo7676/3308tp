// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
	
	// =====================================
    // SETTINGS SECTION ====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/settings', isLoggedIn, function(req, res) {
        res.render('settings.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
	
	// =====================================
    // POST TO TWITTER SECTION =============
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/post', isLoggedIn, function(req, res) {
        res.render('post.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
	
	// =====================================
    // POST TWEET ==========================
    // =====================================
    app.post('/postTweet', isLoggedIn, function(req, res) {
		console.log(req.body.tweetInput)
        res.render('post.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
	
	// =====================================
    // SAVE TWEET ==========================
    // =====================================
    app.post('/saveTweet', isLoggedIn, function(req, res) {
		if (req.body.saveTweetCategory != "" && req.body.saveTweetInput != "") {
		  var User = require('../app/models/user');
		  var category = req.body.saveTweetCategory
		  var newMessage = req.body.saveTweetInput
	      User.findOneAndUpdate(
		    { _id: req.user._id, "twitter.tweets.categories.name": category},
            { $push: { "twitter.tweets.categories.$.messages": {body: newMessage}}},
            { safe: true, upsert: true, new : true},
            function(err, numberAffected, raw) {
              if (err) console.log(err);
            }	
          )
		}
        res.render('post.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
	
	// =====================================
    // SAVE CATEGORY =======================
    // =====================================
    app.post('/saveCategory', isLoggedIn, function(req, res) {
		var User = require('../app/models/user');
		if (req.body.categoryInput != "") {
		  User.findByIdAndUpdate(
		    req.user._id,
	          { $push: { 'twitter.tweets.categories': {name: req.body.categoryInput}}},
	          { safe: true, upsert: true, new : true},
	        function(err, numberAffected, raw) {
            if (err) console.log(err);
		    }	
		  )
		}
        res.render('post.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
	
	// =====================================
    // DELETE CATEGORY =====================
    // =====================================
    app.post('/deleteCategory', isLoggedIn, function(req, res) {
		console.log(req.body.selectDeleteCategory)
		var User = require('../app/models/user');
		User.findByIdAndUpdate(
		  req.user._id,
		  { $pull: { 'twitter.tweets.categories': {name: req.body.selectDeleteCategory}}},
		  { safe: true, upsert: true, new : true},
		  function(err, numberAffected, raw) {
            if (err) console.log(err);
		  }	
		)
        res.render('post.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
