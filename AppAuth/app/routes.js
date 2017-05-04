// app/routes.js
//! Exports all the classes and methods as a "module."
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
        successRedirect : '/profile', // redirect to the secure profile
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

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
    // protected so you have to be logged in to visit
    // use route middleware to verify this (the isLoggedIn function)
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
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


	// =====================================
    // POST TO TWITTER SECTION =============
    // =====================================
    app.get('/post', isLoggedIn, function(req, res) {
		  // dictionary of categories/messages, seems easer to parse than 'user'
		var thisUserJSON = JSON.stringify(req.user.twitter.tweets.categories)
        res.render('post.ejs',
          { user : req.user, userJSON : thisUserJSON }
        );
    });

	// =====================================
    // POST TWEET ==========================
    // =====================================
    app.post('/postTweet', isLoggedIn, function(req, res) {
		console.log(req.body.tweetInput)
		  // dictionary of categories/messages, seems easer to parse than 'user'
		var thisUserJSON = JSON.stringify(req.user.twitter.tweets.categories)
        res.render('post.ejs',
          { user : req.user, userJSON : thisUserJSON }
        );
    });

	// =====================================
    // SAVE TWEET ==========================
    // =====================================
    app.post('/saveTweet', isLoggedIn, function(req, res) {
	      // dictionary of categories/messages, seems easer to parse than 'user'
	    var thisUserJSON = JSON.stringify(req.user.twitter.tweets.categories)
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
          ).then(function(){
		    res.render('post.ejs',
              { user : req.user, userJSON : thisUserJSON }
            );
		  });
		}
	});

	// =====================================
    // SAVE CATEGORY =======================
    // =====================================
    app.post('/saveCategory', isLoggedIn, function(req, res) {
		var User = require('../app/models/user');
		var async = require('async');
		async.waterfall([
		    function() {
				User.find({ id: req.user._id})
				.update({$push:{'twitter.tweets.categories':{name: req.body.categoryInput}}},
				{safe:true,upsert:true,new:true}
				);
			},
			function() {
				var thisUserJSON = JSON.stringify(req.user.twitter.tweets.categories);
                res.render('post.ejs',
                    { user : req.user, userJSON : thisUserJSON }
		        );
			}
		])		
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
            if (err != null && err != req.body.selectDeleteCategory) console.log(err);
		  }	
		)
		  // dictionary of categories/messages, seems easer to parse than 'user'
		var thisUserJSON = JSON.stringify(req.user.twitter.tweets.categories)
        res.render('settings.ejs',
          { user : req.user, userJSON : thisUserJSON }
        );
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

//! Route middleware to make sure a user is logged in.
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
