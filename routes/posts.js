const express = require('express');
const router = express.Router({ mergeParam: true });
const { asyncErrorHandler } = require('../middleware');
const { 
  postIndex, 
  postNew, 
  postCreate,
  postShow,
  postEdit,
  postUpdate 
} = require('../controllers/posts');

/* GET /posts index page. */
router.get('/', asyncErrorHandler(postIndex));

/* GET /posts/new page. */
router.get('/new', postNew);

/* POST posts create /posts/new page. */
router.post('/', asyncErrorHandler(postCreate));

/* GET posts show /posts/:id */
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit /posts/:id/edit page. */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* UPDATE posts update /posts/:id page. */
router.put('/:id', asyncErrorHandler(postUpdate));

/* DELETE posts destroy /posts/:id page. */
router.delete('/:id', (req, res, next) => {
  res.send('DELETE /posts/:id');
});
  

  module.exports = router;