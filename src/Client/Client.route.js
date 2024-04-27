const express = require("express");
const router = express.Router();
const authControllers = require('../User/Auth/Auth.Controller.js');
const clientController = require('./Client.Controller.js');

router.route('/')
    .get(authControllers.protect, clientController.getClient)
    .post(clientController.postClient);

router.route('/:id')
    .get(authControllers.protect, clientController.getSingeClient)
    .patch( authControllers.protect, clientController.updateClient)
    .delete(authControllers.protect, clientController.deleteClient);

module.exports = router;
