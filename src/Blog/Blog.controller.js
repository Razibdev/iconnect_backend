const fs = require('fs');
const catchAsync = require("../utils/catchAsync");
const Blog = require("../Blog/Blog.model");
const APIFeatures = require("../utils/apiFeatures");
const { deleteImage } = require('../utils/deleteImage');
exports.postBlog = catchAsync(async (req, res, next) =>{
    const data = req.body;
    let slug_str_lower = data.title.replace(/\s+/g, '-').toLowerCase();

    const blog = await Blog.create({
        title: data.title,
        slug: slug_str_lower,
        description: data.description
    });

    if (req.files['file'].length) {
        blog.image = req.files['file'][0].filename;
        await blog.save();
    }

    return res.status(201).json({
        status: 'success',
        message: 'New post added successfully done !!!',
        data: blog
    });

});


exports.updateBlog = catchAsync(async (req, res, next)=>{
    const postId = req.params.id;
    const data = req.body;
    let slug_str_lower = data.title.replace(/\s+/g, '-').toLowerCase();

    const blog = await Blog.findById(postId);
    blog.title = data.title;
    blog.description = data.description;
    blog.slug = slug_str_lower;

    if (req.files['file'].length) {
        deleteImage(blog.image, (err, message) => {
            if (err) {
                console.error('Error deleting image:', err.message);
            } else {
                console.log(message);
            }
        });

        blog.image = req.files['file'][0].filename;
        await blog.save();
    }


    await blog.save();
    return res.status(202).json({
        message: 'Project updated successfully done',
        status: 'success',
        data: blog
    });
});

exports.deleteBlog = catchAsync(async (req, res, next) =>{
    const subCategoryId = req.params.id;
    const blog = await Blog.findById(subCategoryId);

        deleteImage(blog.image, (err, message) => {
            if (err) {
                console.error('Error deleting image:', err.message);
            } else {
                console.log(message);
            }
        });

    await blog.delete();

    return res.status(204).json({
        status: 'failure',
        message: 'One sub category deleted successfully done',
        data: ''
    });
});


exports.getBlog = catchAsync(async(req, res, next) =>{
    const features = new APIFeatures(Blog.find(), req.query)
        .paginate();
    const project = await features.query.lean();
    const allResult = new APIFeatures(Blog.find(), req.query);
    const all = await allResult.query;
    return res.status(200).json({
        status: "success",
        results: project.length,
        all_result: all.length,
        data: project,
    });
});

exports.getSingleBlog = catchAsync(async (req, res, next) =>{
const postId = req.params.id;
const blog = await Blog.findById(postId);
    return res.status(200).json({
        status: "success",
        data: blog
    });
});



