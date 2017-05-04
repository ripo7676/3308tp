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
        successRedirect : '/profile',
        failureRedirect : '/signup', 
        failureFlash : true 
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
		if (req.body.saveTweetCategory != "" && req.body.saveTweetInput != "") {
		  var User = require('../app/models/user');
		  var categoryID = req.body.saveTweetCategory
		  var newMessage = req.body.saveTweetInput
	      User.findOneAndUpdate(
		    { _id: req.user._id, "twitter.tweets.categories._id": categoryID},
            { $push: { "twitter.tweets.categories.$.messages": {body: newMessage}}},
            { safe: true, upsert: true, new : true},
            function(err, documentsAffected, raw) {
              if (err) console.log(err);
			    //! dictionary of categories/messages, seems easer to parse than 'user'
			  var thisUserJSON = JSON.stringify(documentsAffected);
			  req.user = documentsAffected;
            }
          ).then(function(){
		    res.render('post.ejs',
              { user : req.user, userJSON : thisUserJSON }
            );
		  });
		}
	});
	
	// =====================================
    // DELETE TWEET FROM DATABASE ==========
    // =====================================
    app.post('/deleteTweet', isLoggedIn, function(req, res) {
		var User = require('../app/models/user');
		var categoryID = req.body.deleteTweetCategory
		var messageID = req.body.selectDeleteTweet
	    User.findOneAndUpdate(
		  { _id: req.user._id, "twitter.tweets.categories._id": categoryID},
		  { $pull: { "twitter.tweets.categories.$.messages": {_id: messageID}}},
		  { safe: true, upsert: true, new : true},
		  function(err, numberAffected, raw) {
            if (err) console.log(err);
		  }	
		)
		  // dictionary of categories/messages, seems easer to parse than 'user'
		var thisUserJSON = JSON.stringify(req.user.twitter.tweets.categories)
        res.render('settings.ejs',
          { user : req.user, userJSON : thisUserJSON }
        );
    });

	// =====================================
    // SAVE CATEGORY =======================
    // =====================================
    app.post('/saveCategory', isLoggedIn, function(req, res) {
		var User = require('../app/models/user');
		var async = require('async');
	    User.findOneAndUpdate(
		  { _id: req.user._id},
		  { $push: { "twitter.tweets.categories": {name: req.body.categoryInput}}},
		  { safe: true, upsert: true, new : true},
		  function(err, numberAffected, raw) {
            if (err) console.log(err);
		  }	
		)
		var thisUserJSON = JSON.stringify(req.user.twitter.tweets.categories);
        res.render('settings.ejs',
            { user : req.user, userJSON : thisUserJSON }
        );
	});

	// =====================================
    // DELETE CATEGORY =====================
    // =====================================
    app.post('/deleteCategory', isLoggedIn, function(req, res) {
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
	
	// ====================================
	//AUTHORIZE (FOR ACCOUNTS ALREADY LOGGED IN)
	//=====================================
	
	//LOCAL
	app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile',
			failureRedirect : '/connect/local', 
			failureFlash : true 
		}));
		
	//TWITTER
	app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

		// handle the callback after twitter has AUTHORIZED the user
		app.get('/connect/twitter/callback',
			passport.authorize('twitter', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));
};

//! Route middleware to make sure a user is logged in.
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
