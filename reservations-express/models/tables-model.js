const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tablesSchema = new mongoose.Schema({
  tableMinimum: {
    type: Number,
    required: true
  },
  bottles: {
    type: Array,
    required: true
  }
},
// ----------------------
  {
    timestamps: true

  }
);

const Tables = mongoose.model('Tables', tablesSchema);

module.exports = Tables;
