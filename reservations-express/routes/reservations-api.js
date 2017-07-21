const express = require('express');
const router = express.Router();
const Clubs = require('../models/clubs-model');
const UserModel = require('../models/user-model');
const Tables = require('../models/tables-model');
const bcrypt = require('bcrypt');
const passport = require('passport');



/* CREATE a new Phone. */
// router.post('/user', (req, res, next) => {
//   const theUser = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//   });
//
//   theUser.save((err) => {
//     if (err) {
//       res.json(err);
//       return;
//     }
//
//     res.json({
//       message: 'New User created!',
//       id: theUser._id
//     });
//   });
// });

// -------------------------------------------


const checkGuest  = checkRoles('GUEST');
const checkEditor = checkRoles('EDITOR');
const checkAdmin  = checkRoles('ADMIN');

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login');
    }
  };
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

router.get('/clubs', (req, res, next) => {
  Clubs.find((err, clubsList) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json(clubsList);
    console.log('clubs');
  });
});

//----

router.post('/clubs', checkAdmin, (req, res, next) => {


  const theClub = new Clubs({
    clubName: req.body.clubName,
    clubAddress: req.body.clubAddress,
    clubMusic: req.body.clubMusic,
    clubDescription: req.body.clubDescription
  });
  theClub.save((err) => {
    if (err && theClub.errors === undefined) {
      res.status(500).json({ message: 'Club save went to shit' });
      return;
    }

    if (err && theClub.errors) {
      res.status(400).json({
        nameError: theClub.errors.clubName,
        addressError: theClub.errors.clubAddress,
        musicError: theClub.errors.clubMusic,
        descriptionError: theClub.errors.clubDescription
      });
      return;
    }
    res.status(200).json(theClub);
  });
});

// -----------------------------------------

router.get('/tables', (req, res, next) => {
  Tables.find((err, tablesList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(tablesList);
    console.log('tables');
  });
});

//----

router.post('/tables', checkAdmin, (req, res, next) => {
  const theTable = new Tables({
    tableMinimum: req.body.tableMinimum,
    bottles: req.body.bottles,
  });
  theTable.save((err) => {
    if (err && theTable.errors === undefined) {
      res.status(500).json({ message: 'Table save went to shit' });
      return;
    }

    if (err && theTable.errors) {
      res.status(400).json({
        tableMinError: theTable.errors.tableMinimum,
        bottlesError: theTable.errors.bottles,
      });
      return;
    }
    res.status(200).json(theTable);
  });
});


module.exports = router;
