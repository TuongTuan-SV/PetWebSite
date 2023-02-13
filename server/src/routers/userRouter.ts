const router = require('express').Router();
const userCTL = require('../controllers/userCTL');
import { Verifytoken } from '../middleware/auth';

//Read
router.get('/:id', userCTL.info);

//Write
router.post('/login', userCTL.login);
router.post('/signup', userCTL.register);

//Update
router.route('/:id').delete(userCTL.delete).put(userCTL.update);

module.exports = router;
