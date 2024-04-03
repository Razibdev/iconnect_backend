const express = require("express");
const router = express.Router();
const authControllers = require('../User/Auth/Auth.Controller.js');
const categoryController = require('./SubCategory.controller');
const upload = require('../utils/upload');
const checkUserRole = require('../middleware/middleware');
router.route("/")
    .post(
        upload.single('file'),
        authControllers.protect,
        checkUserRole(['admin', 'super_admin', 'staff']),
        categoryController.postSubCategory)
    .get(
        authControllers.protect,
        checkUserRole(['admin', 'super_admin', 'staff']),
        categoryController.getSubCategories
    );

//get subcategory by category
router.route('/by-category/:id')
    .get(categoryController.getSubcategoryByCategory);

router.route('/:id')
    .get(
        authControllers.protect,
        checkUserRole(['admin', 'super_admin', 'staff']),
        categoryController.getSingleSubCategory
    )
    .patch(
        upload.single('file'),
        authControllers.protect,
        checkUserRole(['admin', 'super_admin', 'staff']),
        categoryController.updateSubCategory
    ).delete(
        authControllers.protect,
        checkUserRole(['admin', 'super_admin']),
        categoryController.deleteSubCategory
    )

module.exports = router;
