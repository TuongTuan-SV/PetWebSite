const router = require('express').Router();
const blogCTL = require('../controllers/blogCTL');

//Router tạo brand mới
router.route('/blog').get(blogCTL.getBlog).post(blogCTL.createBlog);
router
  .route('/blog/:id')
  .delete(blogCTL.deleteBlog)
  .put(blogCTL.updateBlog)
  .post(blogCTL.addReview);

module.exports = router;

export {};
