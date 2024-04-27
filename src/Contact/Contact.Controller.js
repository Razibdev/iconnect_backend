const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require('../utils/apiFeatures.js');
const Contact = require('./Contact.model');

exports.getContact = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Contact.find(), req.query)
        .paginate();
    const client = await features.query;

    const allResult = new APIFeatures(Contact.find(), req.query);
    const all = await allResult.query;
    // const tours = await features.query.populate("reviews");
    return res.status(200).json({
        status: "success",
        results: client.length,
        all_result: all.length,
        data: client,
    });
});

exports.postContact = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const contact = await Contact.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
    });

    return res.status(201).json({
        status: 'success',
        message: 'new Contact added successfully done !!!',
        data: contact
    });
});

exports.getSingeContact = catchAsync(async (req, res, next) => {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);
    return res.status(200).json({
        status: "success",
        data: contact
    });
});

exports.updateContact = catchAsync(async (req, res, next) => {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);
    if (!contact) {
        return res.status(404).json({
            message: 'Contact not available',
            status: 'failure'
        });
    }

    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.message = req.body.message;
    await contact.save();
    return res.status(200).json({
        message: 'Contact updated successfully done',
        status: "success",
        data: contact
    });

});

exports.deleteContact = catchAsync(async (req, res, next) => {
    const contactId = req.params.id;
    await Contact.findByIdAndDelete(contactId);
    return res.status(204).json({
        message: 'Contact deleted successfully done',
        status: "failure"
    });
});
