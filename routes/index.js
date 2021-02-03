const express = require('express');
const passport = require('passport');
const router = express.Router();
//Controllers
const { postRegister } = require('../controllers');
const { errorHandle } = require('../middleware'); 

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Surf shop - Home' });
});

/* GET /register page. */
router.get('/register', (req, res, next) => {
  res.send('GET /register')
});

/* POST /register page. */
router.post('/register', errorHandle(postRegister));

/* GET /login page. */
router.get('/login', (req, res, next) => {
  res.send('GET /login')
});

/* POST /login page. */
router.post('/login', passport.authenticate('local', { 
  successRedirect: '/', 
  failureRedirect: '/login' 
}));

/* GET /logout page. */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
})

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

/* GET /reset/:token page. */
router.get('/reset/:token', (req, res, next) => {
  res.send('GET /reset/:token')
});

/* PUT /reset/:token page. */
router.put('/reset/:token', (req, res, next) => {
  res.send('PUT /reset/:token')
});

module.exports = router;
