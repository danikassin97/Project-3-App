const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/reservations-express");


const User = require("../models/user-model.js");

const userArray = [
  {
    firstName: "Daniel",
    lastName: "Daniel",
    username: "Daniel",
    email: "Daniel",
    password: "Daniel",
  }
];

User.create(
  userArray,               // first argument --> array of product info objects

  (err, userResults) => {      // second argument --> callback
    if (err) {
      console.log("problem");
      return;
    }
      userResults.forEach((oneUser) => {
        console.log("new product: " + oneUser.firstName);
      });
    }

);
