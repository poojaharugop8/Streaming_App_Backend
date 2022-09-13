const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
  name: { type: String },
  image: { type: String },
  profilecompleted: { type: Boolean, default: false },
  premiumuser: { type: Boolean, default: false },
  email: {
    type: String, unique: true, required: true, validdate: {
      validator: function (email) {
        var rex = /\S+@\S+\.\S+/;
        return re.test(email);
      }
    }
  },
  password: { type: String, required: true },
  creationdate: { type: Date, default: new Date() },
  verified: { type: Boolean, default: false },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^([0-9]{10}$/.test(v);
      },
    },
  },
});

const UserModel = Mongoose.model('users', UserSchema);
module.exports = UserModel;
