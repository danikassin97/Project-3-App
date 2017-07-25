const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clubsSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true
  },
  clubImage: {
    type: String,
    required: true
  },
  clubAddress: {
    type: String,
    required: true
  },
  clubMusic: {
    type: String,
    required: true
  },
  clubDescription: {
    type: String,
    required: true
  },
  clubFloorplan: {
    type: String,
    required: true
  },
  tableMinimum: {
    type: Number,
    required: true
  },
  bottles: {
    type: Array,
    required: true
  }
  // ------------
  // tablesRes: { type: Schema.Types.ObjectId, ref: 'Tables'},
},
{
  timestamps: true

}
);

const Clubs = mongoose.model('Clubs', clubsSchema);

module.exports = Clubs;
