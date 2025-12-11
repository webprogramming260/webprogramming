const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const express = require('express');
const app = express();
app.use(cookieParser());

app.get('/cookie', (req, res) => {
  const token = uuid.v4();
  res.cookie('token', token, { secure: true, httpOnly: true, sameSite: 'strict' });
  res.send({ token: token });
});

app.get('*', (req, res) => {
  const token = req.cookies?.token;
  res.send({ token: token });
});

app.listen(3000);
