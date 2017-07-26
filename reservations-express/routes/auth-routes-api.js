const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const UserModel = require('../models/user-model');

const router = express.Router();


// POST signup
router.post('/signup', (req, res, next) => {
  if (!req.body.signupEmail || !req.body.signupPassword) {
    res.status(400).json({ message: 'Need both email and password' });
    return;
  }

  UserModel.findOne(
    { email: req.body.signupEmail },
    (err, userFromDb) => {
      if (err) {
        res.status(500).json({ message: 'Email went to shit' });
        return;
      }
       if (userFromDb) {
         res.status(400).json({ message: 'Email already exists' });
         return;
       }
       const salt = bcrypt.genSaltSync(10);
       const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

       const theUser = new UserModel({
         fullName: req.body.signupFullName,
         email: req.body.signupEmail,
         phoneNum: req.body.signupNumber,
         username: req.body.signupUsername,
         encryptedPassword: scrambledPassword
       });
       theUser.save((err) => {
         if (err) {

           res.status(500).json({ message: 'User save went to shit' });
           return;
         }

         req.login(theUser, (err) => {
           if (err) {
             res.status(500).json({ message: 'Login went to shit' });
             return;
           }
         });
         console.log('nice');
        theUser.encryptedPassword = undefined;
        res.status(200).json(theUser);
       });
    }
  );
});

// ------------------------

// POST login
router.post('/login', (req, res, next) => {
  const authenticateFunction =
    passport.authenticate('local', (err, theUser, extraInfo) => {
      if (err) {
        res.status(500).json({ message: 'unknown login error' });
        return;
      }
      if (!theUser) {
      res.status(401).json(extraInfo);
      console.log('what is this');
      return;
      }
      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'session save error' });
          return;
        }

        theUser.encryptedPassword = undefined;

        res.status(200).json(theUser);
      });
    });
  authenticateFunction(req, res, next);
});

// -------------------------------------

// POST logout
router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Log out success' });
});

// ------------

// GET checklogin
router.get('/checklogin', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Nobody logged in' });
    return;
  }
  req.user.encryptedPassword = undefined;
  res.status(200).json(req.user);
});





module.exports = router;
