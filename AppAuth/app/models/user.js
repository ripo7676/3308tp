// app/models/user.js
  //! Required for working with the MongoDB.
var mongoose = require('mongoose');
  //! Required to utilize the Blowfish encryption algorithm.
var bcrypt   = require('bcrypt-nodejs');

//! Define the schema for our user model
var userSchema = mongoose.Schema({

  local                  : {
    email                : String,
    password             : String
  },
  
  twitter                : {
    id                   : String,
    token                : String,
    displayName          : String,
    username             : String,
    tweets               : {
      categories         : [{id: Number, name: String,
	    messages         : [{id: Number, body: String}]
	  }]
    }
  }

});

// methods ======================
  //! Generate a "hash" using the password and generated salt.
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

  //! Check if given password matches with the hash stored in the database.
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

  //! Create the model for users and expose it to our app.
module.exports = mongoose.model('User', userSchema);
