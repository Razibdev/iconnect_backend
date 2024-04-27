const express = require("express");
const router = express.Router();
const authControllers = require('../User/Auth/Auth.Controller.js');
const contactController = require('./Contact.Controller.js');

router.route('/')
    .get(authControllers.protect, contactController.getContact)
    .post(contactController.postContact);

router.route('/:id')
    .get(authControllers.protect, contactController.getSingeContact)
    .patch( authControllers.protect, contactController.updateContact)
    .delete(authControllers.protect, contactController.deleteContact);

module.exports = router;
