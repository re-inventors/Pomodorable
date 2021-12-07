const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.post(
  '/login',
  userController.createUser,
  sessionController.startSession,
  userController.getTimers,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200).json(res.locals.timers);
  }
);

app.post('/timer', sessionController.isLoggedIn, userController.createTimer, userController.getTimers, (req, res) => {
  res.status(200).json(res.locals.timers);
});

app.get('/find', (req, res) => {
  res.sendStatus(200);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// mongodb+srv://aramkrakirian1:mongodb@codesmith-mongodb.yynpv.mongodb.net/Pomodoro?retryWrites=true&w=majority
