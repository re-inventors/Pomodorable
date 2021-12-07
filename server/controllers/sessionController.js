const { Session } = require('../models/PomodoroModel.js');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  if(!res.locals.alreadyCreated) {
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
  } else { 
    return next();
  }
};

sessionController.isLoggedIn = (req, res, next) => {
  console.log(req);
  Session.findOne({ cookieId: req.cookies.ssid }, (err, session) => {
    if (err) {
      console.log(err);
      return next({
        log: 'sessionController.isLoggedIn: Error searching for session',
        message: { err: 'an error occured' },
      });
    } else {
      res.locals.isLoggedIn = true;
      res.locals.ssid = req.cookies.ssid;
      return next();
    } 
  });
};


module.exports = sessionController;

























































































































