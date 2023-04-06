const router = require('express').Router();
const carouselCTL = require('../controllers/carouselCTL');

//Router tạo brand mới
router
  .route('/carousel')
  .get(carouselCTL.getCarousel)
  .post(carouselCTL.addCarousel);
router
  .route('/carousel/:id')
  .delete(carouselCTL.deleteCarousel)
  .put(carouselCTL.updateProduct);
module.exports = router;

export {};
