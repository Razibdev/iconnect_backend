const express = require("express");
const router = express.Router();
const districtController = require("../Controller/districtController");

router.route("/")
    .get(districtController.getDistrict);

router.route('/filter')
    .get(districtController.getDistrictFilterData);

module.exports = router;