const express = require("express");
const router = express.Router();
const GymController = require('../controller/gymcontroller');


router.get("/gymsss", GymController.GetGyms); 

module.exports = router;

