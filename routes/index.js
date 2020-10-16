const express = require('express');
//setting up express router
const router = express.Router();
const homeController = require('../controllers/home_controller');
router.get('/',homeController.home);
router.use('/users', require('./users'));
// router.use('/routerName', require('./routerfile));
module.exports=router;