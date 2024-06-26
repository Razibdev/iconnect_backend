const fs = require('fs');
const catchAsync = require("../utils/catchAsync");
const Portfolio = require("../Portfolio/Portfolio.model");
const APIFeatures = require("../utils/apiFeatures");
const { deleteImage } = require('../utils/deleteImage');

exports.postPortfolio = catchAsync(async (req, res, next) =>{
    const data = req.body;
    console.log(req.files['file']);
    console.log(req.files['files']);

    let slug_str_lower = data.title.replace(/\s+/g, '-').toLowerCase();

    const portfolio = await Portfolio.create({
        title: data.title,
        slug: slug_str_lower,
        pre_text: data.pre_text,
        description: data.description
    });

    if (req.files['file']?.length) {
        portfolio.feature_image = req.files['file'][0].filename;
        await portfolio.save();
    }
    // if (req.files['files']?.length) {
    //     for (let i = 0; i < req.files['files'].length; i++) {
    //         let image_url = req.files['files'][i].filename;
    //
    //         portfolio.image_list.push({
    //             image: image_url
    //         });
    //         await portfolio.save();
    //     }
    // }

    if (req.files['files']?.length) {
        let image = Array();
        for (let i = 0; i < req.files['files'].length; i++) {
            let image_url = req.files['files'][i].filename;
            image.push(image_url);

        }
        portfolio.image_list = image;
        await portfolio.save();
    }

    // const portfolio = await Portfolio.findById(portfolioId);

    return res.status(201).json({
        status: 'success',
        message: 'New team added successfully done !!!',
        data: portfolio
    });

});


exports.updatePortfolio = catchAsync(async (req, res, next)=>{
    const portfolioId = req.params.id;
    const data = req.body;
    let slug_str_lower = data.title.replace(/\s+/g, '-').toLowerCase();
    const portfolio = await Portfolio.findById(portfolioId);
    portfolio.pre_text = data.pre_text;
    portfolio.title = data.title;
    portfolio.slug = slug_str_lower;
    portfolio.description = data.description;

    if (req.files['file'].length) {
        deleteImage(portfolio.feature_image, (err, message) => {
            if (err) {
                console.error('Error deleting image:', err.message);
            } else {
                console.log(message);
            }
        });

        portfolio.feature_image = req.files['file'][0].filename;
        await portfolio.save();
    }

    if (req.files['files']?.length) {

        portfolio.image_list.forEach((item) =>{
            deleteImage(item, (err, message) => {
                if (err) {
                    console.error('Error deleting image:', err.message);
                } else {
                    console.log(message);
                }
            });
        })

        let image = Array();
        for (let i = 0; i < req.files['files'].length; i++) {
            let image_url = req.files['files'][i].filename;
            image.push(image_url);

        }
        portfolio.image_list = image;
        await portfolio.save();
    }


    await portfolio.save();
    return res.status(202).json({
        message: 'Team member updated successfully done',
        status: 'success',
        data: portfolio
    });
});

exports.deleteportfolio = catchAsync(async (req, res, next) =>{
    const teamId = req.params.id;
    const portfolio = await Portfolio.findById(teamId);

        deleteImage(portfolio.feature_image, (err, message) => {
            if (err) {
                console.error('Error deleting image:', err.message);
            } else {
                console.log(message);
            }
        });

    portfolio.image_list.forEach((item) =>{
        deleteImage(item, (err, message) => {
            if (err) {
                console.error('Error deleting image:', err.message);
            } else {
                console.log(message);
            }
        });
    });

    await Portfolio.findByIdAndDelete(teamId);

    return res.status(204).json({
        status: 'failure',
        message: 'One team member deleted successfully done',
        data: ''
    });
});


exports.getPortfolio = catchAsync(async(req, res, next) =>{
    const features = new APIFeatures(Portfolio.find(), req.query)
        .paginate();
    const project = await features.query.lean();
    const allResult = new APIFeatures(Portfolio.find(), req.query);
    const all = await allResult.query;
    return res.status(200).json({
        status: "success",
        results: project.length,
        all_result: all.length,
        data: project,
    });
});

exports.getSinglePortfolio = catchAsync(async (req, res, next) =>{
const postId = req.params.id;
const portfolio = await Portfolio.findById(postId);
    return res.status(200).json({
        status: "success",
        data: portfolio
    });
});



