const express = require("express");
const router = express.Router();
const authControllers = require('../User/Auth/Auth.Controller.js');
const projectController = require('./Project.controller');
const upload = require('../utils/uploadImage');
const checkUserRole = require('../middleware/middleware');
router.route("/")
    .post(
        // upload.single('file'),
        // authControllers.protect,
        // checkUserRole(['admin', 'super_admin', 'staff']),
        upload.fields([{ name: 'file', maxCount: 1 }, { name: 'files', maxCount: 10 }]),
        projectController.postProject)
    .get(
        // authControllers.protect,
        // checkUserRole(['admin', 'super_admin', 'staff']),
        projectController.getProject
    );

router.route('/:id')
    .get(
        // authControllers.protect,
        // checkUserRole(['admin', 'super_admin', 'staff']),
        projectController.getSingleProject
    )
    .patch(
        upload.fields([{ name: 'file', maxCount: 1 }, { name: 'files', maxCount: 10 }]),
        // authControllers.protect,
        // checkUserRole(['admin', 'super_admin', 'staff']),
        projectController.updateProject
    ).delete(
        // authControllers.protect,
        // checkUserRole(['admin', 'super_admin']),
        projectController.deleteProject
    )

module.exports = router;
