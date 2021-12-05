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
  '/user',
  userController.createUser, cookieController.setSSIDCookie, sessionController.startSession,
  (req, res) => {
    res.sendStatus(200);
  }
);

app.post('/timer', userController.createTimer, (req, res) => {
  res.sendStatus(200);
});

app.get('/find', userController.addTimerToUser, (req, res) => {
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
