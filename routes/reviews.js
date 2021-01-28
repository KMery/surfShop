const express = require('express');
const router = express.Router({ mergeParam: true });

/* GET /posts/:id/reviews index page. */
router.get('/', (req, res, next) => {
  res.send('INDEX /posts/:id/reviews');
});

/* POST reviews create /posts/:id/reviews/new page. */
router.post('/', (req, res, next) => {
  res.send('CREATE /posts/:id/reviews');
});

/* GET reviews edit /posts/:id/reviews/:review_id/edit page. */
router.get('/:review_id/edit', (req, res, next) => {
  res.send('EDIT /posts/:id/reviews/:review_id/edit');
});

/* UPDATE reviews update /posts/:id/reviews/:review_id page. */
router.put('/:review_id', (req, res, next) => {
  res.send('UPDATE /posts/:id/reviews/:review_id');
});

/* DELETE reviews destroy /posts/:id/reviews/:review_id page. */
router.delete('/:review_id', (req, res, next) => {
  res.send('DELETE /posts/:id/reviews/:review_id');
});
  

  module.exports = router;