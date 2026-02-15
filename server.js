const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const stripe = require('stripe')('STRIPE_SECRET_KEY'); // kendi secret keyini koy

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true
}));

const users = [{ username: 'admin', password: '12345' }];

app.get('/admin/login', (req, res) => {
  res.send('<form method="post" action="/admin/login"><input name="username"/><input name="password" type="password"/><button>Giriş</button></form>');
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = user;
    res.redirect('/admin/dashboard');
  } else {
    res.send('Hatalı giriş');
  }
});

app.get('/admin/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/admin/login');
  res.send('Admin paneline hoş geldin!');
});

app.get('/admin/logout', (req, res) => {
  req