const router = require('express').Router();
const userCTL = require('../controllers/userCTL');
const auth = require('../middleware/auth');
//Write
router.post('/login', userCTL.login);
router.post('/signup', userCTL.register);
router.get('/logout', userCTL.logout);
//Read
router.get('/refresh_token', userCTL.refreshToken);
router.get('/info', auth, userCTL.info);

router.patch('/addcart', auth, userCTL.addCart);
//Update
router.route('/:id').delete(userCTL.delete).put(userCTL.update);

module.exports = router;
export {};
