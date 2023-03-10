const router = require('express').Router();
const orderCTL = require('../controllers/orderCTL');
const auth = require('../middleware/auth');
//Write

router.route('/order').get(orderCTL.getOrder).post(auth, orderCTL.createOrder);

module.exports = router;

export {};
