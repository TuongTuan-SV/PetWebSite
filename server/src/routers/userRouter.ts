const router = require("express").Router();
const userCTL = require('../controllers/userCTL')

router.get('/:id',userCTL.info)
router.post('/login',userCTL.login)
router.post('/signup',userCTL.register);

router.route('/:id').delete(userCTL.delete).put(userCTL.update)

module.exports = router