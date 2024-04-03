const express = require("express");
const router = express.Router();
const authControllers = require('../User/Auth/Auth.Controller.js');
const blogController = require('./Blog.controller');
const upload = require('../utils/uploadImage');

router.route("/")
    .post(
        authControllers.protect,
        upload.fields([{ name: 'file', maxCount: 1 }]),
        blogController.postBlog)
    .get(
        authControllers.protect,
        blogController.getBlog
    );

router.route('/:id')
    .get(
        authControllers.protect,
        blogController.getSingleBlog
    )
    .patch(
        upload.fields([{ name: 'file', maxCount: 1 }]),
        authControllers.protect,
        blogController.updateBlog
    ).delete(
        authControllers.protect,
        blogController.deleteBlog
    )

module.exports = router;

// checkUserRole(['admin', 'super_admin', 'staff']),