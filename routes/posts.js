const express = require('express');
const router = express.Router({ mergeParams: true });
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage });
const { asyncErrorHandler } = require('../middleware');
const { 
  postIndex, 
  postNew, 
  postCreate,
  postShow,
  postEdit,
  postUpdate,
  postDelete 
} = require('../controllers/posts');

/* GET /posts index page. */
router.get('/', asyncErrorHandler(postIndex));

/* GET /posts/new page. */
router.get('/new', postNew);

/* POST posts create /posts/new page. */
router.post('/', upload.array('images', 4), asyncErrorHandler(postCreate));

/* GET posts show /posts/:id */
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit /posts/:id/edit page. */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* UPDATE posts update /posts/:id page. */
router.put('/:id', upload.array('images', 4), asyncErrorHandler(postUpdate));

/* DELETE posts destroy /posts/:id page. */
router.delete('/:id', asyncErrorHandler(postDelete));
  

  module.exports = router;