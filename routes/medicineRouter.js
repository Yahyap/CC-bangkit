const express = require("express");
const passport = require("passport");
const router = express.Router();
const medicineController = require("../controllers/medicineController");

//router.get("/json", passport.authenticate("jwt", { session: false }), medicineController.getMed);
router.get("/med"), medicineController.getMed;

module.exports = router;
