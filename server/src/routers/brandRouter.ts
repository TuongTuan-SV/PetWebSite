const router = require('express').Router();
const brandCTL = require('../controllers/brandCTL');

//Router tạo brand mới
router.route('/brands').get(brandCTL.getBrands).post(brandCTL.createBrand);
module.exports = router;

export {};
