const express = require("express");
const router = express.Router();
const authControllers = require('../User/Auth/Auth.Controller.js');
const blogController = require('./Portfolio.controller');
const upload = require('../utils/uploadImage');

router.route("/")
    .post(
        authControllers.protect,
        upload.fields([{ name: 'file', maxCount: 1 }, { name: 'files', maxCount: 10 }]),
        blogController.postPortfolio)
    .get(
        // authControllers.protect,
        blogController.getPortfolio
    );

router.route('/:id')
    .get(
        // authControllers.protect,
        blogController.getSinglePortfolio
    )
    .patch(
        upload.fields([{ name: 'file', maxCount: 1 }, { name: 'files', maxCount: 10 }]),
        authControllers.protect,
        blogController.updatePortfolio
    ).delete(
        authControllers.protect,
        blogController.deleteportfolio
    )

module.exports = router;

// checkUserRole(['admin', 'super_admin', 'staff']),