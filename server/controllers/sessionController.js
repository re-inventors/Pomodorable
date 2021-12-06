const { Session } = require('../models/PomodoroModel.js');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  Session.create({ cookieId: res.locals.ssid }, (err, session) => {
    if (err) {
      console.log(err);
      return next({
        log: 'sessionController.startSession: Error creating session ',
        message: { err: 'an error occured' },
      });
    }
    return next();
  });
};

sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({ cookieId: req.cookies.ssid }, (err, session) => {
    if (err) {
      console.log(err);
      return next({
        log: 'sessionController.isLoggedIn: Error searching for session',
        message: { err: 'an error occured' },
      });
    }
    if (session) res.locals.isLoggedIn = true;
  });
};


module.exports = sessionController;

























































































































