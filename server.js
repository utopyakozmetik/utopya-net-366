const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const stripe = require('stripe')('STRIPE_SECRET_KEY'); // kendi Stripe secret keyini buraya koy

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session ayarı (admin login için)
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true
}));

// Basit kullanıcı listesi (gerçekte DB olmalı)
const users = [
  { username: 'admin', password: '12345' }
];

// Admin login formu
app.get('/admin/login', (req, res) => {
  res.send(`
    <form method="post" action="/admin/login">
      <input type="text" name="username" placeholder="Kullanıcı adı" />
      <input type="password" name="password" placeholder="Şifre" />
      <button type="submit">Giriş</button>
    </form>
  `);
});

// Admin login kontrol
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

// Admin dashboard
app.get('/admin/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/admin/login');
  }
  res.send('Admin paneline hoş geldin!');
});

// Admin logout
app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Stripe ödeme route
app.post('/checkout', async (req, res) => {
  try {
    const { amount, currency, token } = req.body;

    const charge = await stripe.charges.create({
      amount: amount, // kuruş cinsinden (ör: 1000 = 10.00 TL)
      currency: currency,
      source: token,
      description: 'Ütopya.net alışverişi'
    });

    res.json({ success: true, charge });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Server çalışıyor http://localhost:3000'));
