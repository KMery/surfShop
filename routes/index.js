const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Surf shop - Home' });
});

/* GET /register page. */
router.get('/register', (req, res, next) => {
  res.send('GET /register')
});

/* POST /register page. */
router.post('/register', (req, res, next) => {
  res.send('POST /register')
});

/* GET /login page. */
router.get('/login', (req, res, next) => {
  res.send('GET /login')
});

/* POST /login page. */
router.post('/login', (req, res, next) => {
  res.send('POST /login')
});

/* GET /profile page. */
router.get('/profile', (req, res, next) => {
  res.send('GET /profile')
});

/* PUT /profile/:user_id page. */
router.put('/profile/:user_id', (req, res, next) => {
  res.send('PUT /profile/:user_id')
});

/* GET /forgot-password page. */
router.get('/forgot', (req, res, next) => {
  res.send('GET /forgot')
});

/* PUT /forgot-password page. */
router.put('/forgot', (req, res, next) => {
  res.send('PUT /forgot')
});

/* GET /reset-password page. */
router.get('/reset/:token', (req, res, next) => {
  res.send('GET /reset/:token')
});

/* PUT /reset-password page. */
router.put('/reset/:token', (req, res, next) => {
  res.send('PUT /reset/:token')
});

module.exports = router;