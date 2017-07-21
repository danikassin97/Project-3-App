const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/reservations");


const Club = require("../models/clubs-model.js");

const clubsArray = [
  {
    clubName: "Daniel",
  }
];

Club.create(
  clubsArray,               // first argument --> array of product info objects

  (err, clubResults) => {      // second argument --> callback
    if (err) {
      console.log("problem");
      return;
    }
      clubResults.forEach((oneClub) => {
        console.log("new product: " + oneClub.clubName);
      });
    }

);
