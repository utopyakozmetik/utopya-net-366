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
  req.session.destroy(err => {
    if (err) {
      return res.send('Çıkış yapılırken hata oluştu');
    }
    res.redirect('/admin/login');
  });
});

// Stripe ödeme örneği (checkout)
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Parfüm',
          },
          unit_amount: 29000, // örnek fiyat (290€)
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send('Ödeme oturumu oluşturulamadı: ' + error.message);
  }
});

app.get('/success', (req, res) => {
  res.send('Ödeme başarılı!');
});

app.get('/cancel', (req, res) => {
  res.send('Ödeme iptal edildi.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
