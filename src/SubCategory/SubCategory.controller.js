const fs = require('fs');
const catchAsync = require("../utils/catchAsync");
const SubCategory = require("../SubCategory/SubCategory.model");
const APIFeatures = require("../utils/apiFeatures");
const DeleteObject = require("../utils/delete");
exports.postSubCategory = catchAsync(async (req, res, next) =>{
    const data = req.body;
    // let image_url = req.file.path.split("\\");
    //     image_url = image_url[2]+'/'+image_url[3];

    let slug_str_lower = data.sub_cat_name.replace(/\s+/g, '-').toLowerCase();
    const subCategory = await SubCategory.create({
        sub_cat_name: data.sub_cat_name,
        sub_cat_description: data.sub_cat_description,
        sub_cat_slug : slug_str_lower,
        image_url: process.env.IMAGE_URL + req.file.key,
        status: true,
        category_id: data.category_id
    });
    return res.status(201).json({
        status: 'success',
        message: 'New one category created successfully done',
        data: subCategory
    });
});

exports.getSubCategories = catchAsync(async(req, res, next) =>{
    const features = new APIFeatures(SubCategory.find().populate({ path: 'category_id',
        select: '_id category_name'}), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const project = await features.query.lean();

    const allResult = new APIFeatures(SubCategory.find().populate({ path: 'category_id',
        select: '_id category_name'}), req.query);
    const all = await allResult.query;
    // const tours = await features.query.populate("reviews");
    return res.status(200).json({
        status: "success",
        results: project.length,
        all_result: all.length,
        data: project,
    });
});

exports.getSingleSubCategory = catchAsync(async (req, res, next) =>{
const subCategoryId = req.params.id;
const subCategory = await SubCategory.findById(subCategoryId);
    return res.status(200).json({
        status: "success",
        data: subCategory
    });
});

exports.updateSubCategory = catchAsync(async (req, res, next)=>{
    const subCategoryId = req.params.id;
    const data = req.body;
    let slug_str_lower = data.sub_cat_name.replace(/\s+/g, '-').toLowerCase();
    const subCategory = await SubCategory.findById(subCategoryId);
         subCategory.sub_cat_name = data.sub_cat_name;
         subCategory.cat_description = data.cat_description;
         subCategory.sub_cat_slug = slug_str_lower;

            if (req.file) {
                if(subCategory.image_url){
                    await DeleteObject(subCategory.image_url);
                }
                subCategory.image_url = process.env.IMAGE_URL + req.file.key;
            }

        await subCategory.save();
         return res.status(202).json({
             message: 'Sub category updated successfully done',
             status: 'success',
             data: subCategory
         });
});

exports.deleteSubCategory = catchAsync(async (req, res, next) =>{
    const subCategoryId = req.params.id;
    await SubCategory.findByIdAndDelete(subCategoryId);
    return res.status(204).json({
        status: 'failure',
        message: 'One sub category deleted successfully done',
        data: ''
    });
});

exports.getSubcategoryByCategory = catchAsync(async (req, res, next) =>{
    const categoryId = req.params.id;
    const subCategory = await SubCategory.find({category_id: categoryId});
    return res.status(200).json({
        status: 'success',
        data: subCategory
    });
});

