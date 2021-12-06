const { User } = require('../models/PomodoroModel');

const userController = {};

userController.createUser = (req, res, next) => {
  User.findOne({ username: req.body.userName })
    .then((user) => {
      if (!user) {
        User.create({ username: req.body.userName })
          .then((result) => {
            res.locals.ssid = result._doc._id;
            return next();
          })
          .catch((err) => {
            console.log(err);
            return next({
              log: 'userController.createUser: Error trying to create user',
              message: { err: 'an error occured' },
            });
          });
      } else {
        res.locals.ssid = user._doc._id;
        return next();
      }
    })
    // User.create({ username: req.body.username })
    //   .then((result) => {
    //     console.log(result);
    //     return next();
    //   })
    .catch((err) => {
      console.log(err);
      return next({
        log: 'userController.createUser: Error trying to find user',
        message: { err: 'an error occured' },
      });
    });
};

userController.createTimer = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.cookies.ssid },
    { $push: { timers: { timerLabel: req.body.label, timerDuration: req.body.dur }}}
    //{ timers: [{ timerLabel: req.body.label, timerDuration: req.body.dur }] } //{ $push: { <field1>: <value1>, ... } }
  )
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

userController.getTimers = (req, res, next) => {
  User.findOne({ _id: req.cookies.ssid })
    .then((user) => {
      res.locals.timers = user._doc.timers;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'userController.getTimers: Error trying to retrieve timers',
        message: { err: 'an error occured' },
      });
    });
};

module.exports = userController;
