const fs = require('fs');
const catchAsync = require("../utils/catchAsync");
const Project = require("../Project/Project.model");
const APIFeatures = require("../utils/apiFeatures");
const DeleteObject = require("../utils/delete");
const { deleteImage } = require('../utils/deleteImage');
exports.postProject = catchAsync(async (req, res, next) =>{
    const data = req.body;
    let slug_str_lower = data.project_name.replace(/\s+/g, '-').toLowerCase();
    let pro_sku = Math.floor(100000 + Math.random() * 900000);
    const project = await Project.create({
        project_name: data.project_name,
        slug: slug_str_lower,
        pro_sku: pro_sku,
        description: data.description,
        price: data.price
    });

    if (req.files['file'].length) {
        project.image = req.files['file'][0].filename;
        await project.save();
    }
    if (req.files['files'].length) {
        let image = Array();
        for (let i = 0; i < req.files['files'].length; i++) {
            let image_url = req.files['files'][i].filename;
            image.push(image_url);

        }
        project.group_image = image;
        await project.save();
    }

    return res.status(201).json({
        status: 'success',
        message: 'New project added successfully done !!!',
        data: project
    });

});


exports.updateProject = catchAsync(async (req, res, next)=>{
    const subCategoryId = req.params.id;
    const data = req.body;
    let slug_str_lower = data.project_name.replace(/\s+/g, '-').toLowerCase();

    const project = await Project.findById(subCategoryId);
    project.project_name = data.project_name;
    project.description = data.description;
    project.slug = slug_str_lower;
    project.price = data.price;

    if (req.files['file'].length) {
        deleteImage(project.image, (err, message) => {
            if (err) {
                console.error('Error deleting image:', err.message);
            } else {
                console.log(message);
            }
        });

        project.image = req.files['file'][0].filename;
        await project.save();
    }

    if (req.files['files'].length) {

        project.group_image.forEach((item) =>{
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
        project.group_image = image;
        await project.save();
    }

    await project.save();
    return res.status(202).json({
        message: 'Project updated successfully done',
        status: 'success',
        data: project
    });
});

exports.deleteProject = catchAsync(async (req, res, next) =>{
    const subCategoryId = req.params.id;
    const project = await Project.findById(subCategoryId);
        deleteImage(project.image, (err, message) => {
            if (err) {
                console.error('Error deleting image:', err.message);
            } else {
                console.log(message);
            }
        });


        project.group_image.forEach((item) =>{
            deleteImage(item, (err, message) => {
                if (err) {
                    console.error('Error deleting image:', err.message);
                } else {
                    console.log(message);
                }
            });
        })


    return res.status(204).json({
        status: 'failure',
        message: 'One sub category deleted successfully done',
        data: ''
    });
});


exports.getProject = catchAsync(async(req, res, next) =>{
    const features = new APIFeatures(Project.find(), req.query)
        .paginate();
    const project = await features.query.lean();
    const allResult = new APIFeatures(Project.find(), req.query);
    const all = await allResult.query;
    return res.status(200).json({
        status: "success",
        results: project.length,
        all_result: all.length,
        data: project,
    });
});

exports.getSingleProject = catchAsync(async (req, res, next) =>{
const subCategoryId = req.params.id;
const subCategory = await Project.findById(subCategoryId);
    return res.status(200).json({
        status: "success",
        data: subCategory
    });
});



