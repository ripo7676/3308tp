// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

  local              : {
    email            : String,
    password         : String
  },
  facebook           : {
    id               : String,
    token            : String,
    email            : String,
    name             : String
  },
  twitter            : {
    id               : String,
    token            : String,
    displayName      : String,
    username         : String,
    tweets           : {
      categories     : [String],
      messages       : [{
        category     : String,
        body         : String
      }]
    }
  },
  google             : {
    id               : String,
    token            : String,
    email            : String,
    name             : String
  }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// return all tweet categories for user
userSchema.methods.getTweetCategories = function() {
    return bcrypt.compareSync(password, this.local.password);
};

// save new tweet category
userSchema.methods.addTweetCategory = function(newCategory) {
  this.findOneAndUpdate(
    { 'local.email': 'rick.poulson@colorado.edu' },
	{ 'local.email': 'changed.it@colorado.edu' },
	{new: true},
	function (err, doc) {
      if (err) console.log(err)
	  else console.log("I think everything is ok")
    }
  );
};


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
