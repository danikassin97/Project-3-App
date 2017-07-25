const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationsSchema = new mongoose.Schema({

  total: {
    type: Number,
    required: true
  },
  bottles: {
    type: Array,
    required: true
  },

  clubRes: { type: Schema.Types.ObjectId, ref: 'Clubs'},

  // tableRes: { type: Schema.Types.ObjectId, ref: 'Tables'},

  userRes: { type: Schema.Types.ObjectId, ref: 'UserModel'}

},
  {
    timestamps: true
  }

);

const ReservationsModel = mongoose.model('Reservations', reservationsSchema);

module.exports = ReservationsModel;
