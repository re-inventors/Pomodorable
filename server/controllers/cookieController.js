const { User } = require('../models/PomodoroModel.js');

const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      console.log(err);
      return next({
        log: 'sessionCcookieer.setSSIDCookie: Error finding user in DB',
        message: { err: 'an error occured' },
      });
    }
    // create this SSID cookie
    res.locals.cookie = res.cookie('ssid', user._doc._id, { httpOnly: true });
    res.locals.ssid = user._doc._id;
    return next();
  });
}

module.exports = cookieController;