const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler, isReviewAuthor } = require('../middleware');
const {
  reviewCreate,
  reviewUpdate,
  reviewDelete
} = require('../controllers/reviews');

/* POST reviews create /posts/:id/reviews/new page. */
router.post('/', asyncErrorHandler(reviewCreate));

/* UPDATE reviews update /posts/:id/reviews/:review_id page. */
router.put('/:review_id', isReviewAuthor, asyncErrorHandler(reviewUpdate));

/* DELETE reviews destroy /posts/:id/reviews/:review_id page. */
router.delete('/:review_id', (req, res, next) => {
  res.send('DELETE /posts/:id/reviews/:review_id');
});

module.exports = router;