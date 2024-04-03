const express = require("express");
const router = express.Router();
const authControllers = require('./Auth/Auth.Controller.js');
// const upload = require("../utils/upload");

    router.route('/auth/register')
        .post(authControllers.signup);

    router.route('/auth/login')
        .post(authControllers.login);

    router.route('/auth/forgot-password')
        .post(authControllers.forgotPassword);

    router.route('/auth/reset-password/:token')
        .patch(authControllers.resetPassword);

    router.route('/auth/update-password')
        .patch(authControllers.protect, authControllers.updatePassword);

router
    .route("/auth/update-user-information")
    .post(authControllers.protect,
        // upload.fields([{name: 'image', maxCount: 1}]),
        authControllers.updateUserProfile);

//admin section
router.route('/admin/get-user')
    .get(authControllers.protect, authControllers.adminGetUser)

router.route('/get_ip_addresss')
    .get(authControllers.getIpAddress)

router.route('/logout')
    .get(authControllers.protect, authControllers.logOut)

router.route('/')
    .get(authControllers.protect, authControllers.getUser)



module.exports = router;
