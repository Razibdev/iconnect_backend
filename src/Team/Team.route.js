const express = require("express");
const router = express.Router();
const authControllers = require('../User/Auth/Auth.Controller.js');
const blogController = require('./Team.controller');
const upload = require('../utils/uploadImage');

router.route("/")
    .post(
        authControllers.protect,
        upload.fields([{ name: 'file', maxCount: 1 }]),
        blogController.postTeam)
    .get(
        authControllers.protect,
        blogController.getTeam
    );

router.route('/:id')
    .get(
        authControllers.protect,
        blogController.getSingleTeam
    )
    .patch(
        upload.fields([{ name: 'file', maxCount: 1 }]),
        authControllers.protect,
        blogController.updateTeam
    ).delete(
        authControllers.protect,
        blogController.deleteTeam
    )

module.exports = router;

// checkUserRole(['admin', 'super_admin', 'staff']),