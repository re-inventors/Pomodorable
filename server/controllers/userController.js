const { User } = require('../models/PomodoroModel');

const userController = {};

userController.createUser = (req, res, next) => {
  User.create({ username: req.body.username })
    .then((result) => {
      console.log(result);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next({
        log: 'userController.createUser: Error trying to create user',
        message: { err: 'an error occured' },
      });
    });
};

userController.createTimer = (req, res, next) => {
  Timer.create({ timerLabel: 'Pizza', timerDuration: 600000 })
    .then((result) => {
      console.log(result);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'userController.createTimer: Error trying to create timer',
        message: { err: 'an error occured' },
      });
    });
};

userController.addTimerToUser = (req, res, next) => {
  Timer.findOne({ timerLabel: 'Pizza' })
    .then((data) => {
      User.updateOne({ userName: 'Bob' }, { timers: [data] }).then((result) => {
        console.log(result);
      });
      return next();
    })
    .catch((err) =>
      next({
        log: 'userController.addTimerToUser: Error trying to add timer',
        message: { err: 'an error occured' },
      })
    );
  // User.updateOne({userName: 'Bob'}, {timers: []})
};

module.exports = userController;
