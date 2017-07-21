const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  // -------------------------
  clubRes: [{ type: Schema.Types.ObjectId, ref: 'Clubs'}],

},
  {
    timestamps: true
  },
  {
  role: {
    type: String,
    enum : ['GUEST', 'EDITOR', 'ADMIN'],
    default : 'GUEST'
  }
}
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
