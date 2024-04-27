const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require('../utils/apiFeatures.js');
const Client = require('./Client.model');

exports.getClient = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Client.find(), req.query)
        .paginate();
    const client = await features.query;

    const allResult = new APIFeatures(Client.find(), req.query);
    const all = await allResult.query;
    // const tours = await features.query.populate("reviews");
    return res.status(200).json({
        status: "success",
        results: client.length,
        all_result: all.length,
        data: client,
    });
});

exports.postClient = catchAsync(async (req, res, next) => {

    console.log(req.body)
    const client = await Client.create({
        company_name: req.body.company_name,
        email: req.body.email,
        subject: req.body.subject,
        phone: req.body.phone,
        description: req.body.description,
    });

    return res.status(201).json({
        status: 'success',
        message: 'new Project added successfully done !!!',
        data: client
    });
});

exports.getSingeClient = catchAsync(async (req, res, next) => {
    const clientId = req.params.id;
    const client = await Client.findById(clientId);
    return res.status(200).json({
        status: "success",
        data: client
    });
});

exports.updateClient = catchAsync(async (req, res, next) => {
    const clientId = req.params.id;
    const data = req.body;
    const client = await Client.findById(clientId);
    if (!client) {
        return res.status(404).json({
            message: 'Client not available',
            status: 'failure'
        });
    }

    client.company_name = req.body.company_name;
    client.email = req.body.email;
    client.phone = req.body.phone;
    client.subject = req.body.subject;
    client.description = req.body.description;
    await client.save();
    return res.status(200).json({
        message: 'Client updated successfully done',
        status: "success",
        data: client
    });

});

exports.deleteClient = catchAsync(async (req, res, next) => {
    const clientId = req.params.id;
    await Client.findByIdAndDelete(clientId);
    return res.status(204).json({
        message: 'Client deleted successfully done',
        status: "failure"
    });
});
