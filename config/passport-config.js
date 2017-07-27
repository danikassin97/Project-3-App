const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../models/user-model');

// save user's id in the bowl (called when user logs in)
passport.serializeUser((userFromDb, next) => {
  next(null, userFromDb._id);
});

// retrieve the user's info from the DB with the id inside the bowl
passport.deserializeUser((idFromBowl, next) => {
  UserModel.findById(
    idFromBowl,
    (err, userFromDb) => {
      if (err) {
        next(err);
        return;
      }
      next(null, userFromDb);
    }
  );
});



// email and password login Strategy
passport.use(new LocalStrategy(
  {
    usernameField: "blahEmail",       // sent through AJAX from angular
    passwordField: "blahPassword"     // sent through AJAX from angular
  },
  (theEmail, thePassword, next) => {
    UserModel.findOne(
      { email: theEmail },
      (err, userFromDb) => {
        if (err) {
          next(err);
          return;
        }

        if (userFromDb === null) {
          next(null, false, { message: 'incorrect email' });
          return;
        }
        if (bcrypt.compareSync(thePassword, userFromDb.encryptedPassword) === false) {
          next(null, false, { message: 'incorrect password' });
          return;
        }
        next(null, userFromDb);
      }
    );    // close UserModel.findOne()
  }       // close (theEmail, thePassword, next) => {
));
