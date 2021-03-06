const express = require('express');
const router = express.Router();
//Controllers
const { postRegister, postLogin, getLogout, landingPage } = require('../controllers');
const { asyncErrorHandler } = require('../middleware'); 

/* GET home/landing page. */
router.get('/', asyncErrorHandler(landingPage));

/* GET /register page. */
router.get('/register', (req, res, next) => {
  res.send('GET /register')
});

/* POST /register page. */
router.post('/register', asyncErrorHandler(postRegister));

/* GET /login page. */
router.get('/login', (req, res, next) => {
  res.send('GET /login')
});

/* POST /login page. */
router.post('/login', postLogin);

/* GET /logout page. */
router.get('/logout', getLogout)

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
