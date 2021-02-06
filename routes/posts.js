const express = require('express');
const router = express.Router({ mergeParam: true });
const { errorHandle } = require('../middleware');
const { 
  getPosts, 
  newPost, 
  createPost 
} = require('../controllers/posts');

/* GET /posts index page. */
router.get('/', errorHandle(getPosts));

/* GET /posts/new page. */
router.get('/new', newPost);

/* POST posts create /posts/new page. */
router.post('/', errorHandle(createPost));

/* GET posts show /posts/:id */
router.get('/:id', (req, res, next) => {
  res.send('SHOW /posts/:id');
});

/* GET posts edit /posts/:id/edit page. */
router.get('/:id/edit', (req, res, next) => {
  res.send('EDIT /posts/:id/edit');
});

/* UPDATE posts update /posts/:id page. */
router.put('/:id', (req, res, next) => {
  res.send('UPDATE /posts/:id');
});

/* DELETE posts destroy /posts/:id page. */
router.delete('/:id', (req, res, next) => {
  res.send('DELETE /posts/:id');
});
  

  module.exports = router;