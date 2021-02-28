const express = require('express');
const router = express.Router({ mergeParam: true });

/* POST reviews create /posts/:id/reviews/new page. */
router.post('/', (req, res, next) => {
  res.send('CREATE /posts/:id/reviews');
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