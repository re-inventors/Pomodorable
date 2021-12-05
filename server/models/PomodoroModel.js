const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://aramkrakirian1:mongodb@codesmith-mongodb.yynpv.mongodb.net/Pomodoro?retryWrites=true&w=majority'
);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  // timerLabel: String,
  // timerDuration: Number
  timers: [
    {
      timerLabel: String,
      timerDuration: Number,
    },
  ],
});

const User = mongoose.model('User', userSchema);

const sessionSchema = new mongoose.Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = {
  User: User,
  Session: Session,
};
