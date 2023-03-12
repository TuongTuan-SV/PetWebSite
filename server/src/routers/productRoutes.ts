const router = require('express').Router();
const productCTL = require('../controllers/productCTL');

// Route toàn bộ products (phẩm)
router
  .route('/products')
  .get(productCTL.getProducts) // Lấy sản phẩm từ db
  .post(productCTL.addProduct); // Tạo sản phẩm mới;

// Route sản phẩm cụ thể
router
  .route('/products/:id')
  .delete(productCTL.deleteProduct) // Xỏa sản phẩm trên db
  .put(productCTL.updateProduct) // Cập nhật sản phẩm;
  .post(productCTL.addReview);

module.exports = router;
