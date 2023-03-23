const router = require('express').Router();
const categoryCTL = require('../controllers/categoryCTL');

//Router tạo brand mới
router
  .route('/category')
  .get(categoryCTL.getCategory)
  .post(categoryCTL.createCategory);
module.exports = router;
router
  .route('/category/:id')
  .delete(categoryCTL.deleteCategory)
  .put(categoryCTL.updateCategory);
export {};
