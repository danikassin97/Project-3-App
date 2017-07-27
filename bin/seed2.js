const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/reservations-express");


const Tables = require("../models/tables-model.js");

const tablesArray = [
  {
    tableMinimum: 400,
    bottles: ["D", "C"]
  }
];

Tables.create(
  tablesArray,               // first argument --> array of product info objects

  (err, tableResults) => {      // second argument --> callback
    if (err) {
      console.log("problem");
      return;
    }
      tableResults.forEach((oneTable) => {
        console.log("new product: " + oneTable.bottles);
      });
    }

);
