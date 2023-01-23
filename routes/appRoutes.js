const express = require("express");
const getWeather = require('../controllers/appController')
const router = express.Router();

router.route('/:place').get(getWeather)
module.exports=router