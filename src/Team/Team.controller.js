const fs = require('fs');
const catchAsync = require("../utils/catchAsync");
const Team = require("../Team/Team.model");
const APIFeatures = require("../utils/apiFeatures");
const { deleteImage } = require('../utils/deleteImage');
exports.postTeam = catchAsync(async (req, res, next) =>{
    const data = req.body;
    const team = await Team.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        designation: data.designation,
        description: data.description
    });

    if (req.files['file'].length) {
        team.image = req.files['file'][0].filename;
        await team.save();
    }

    return res.status(201).json({
        status: 'success',
        message: 'New team added successfully done !!!',
        data: team
    });

});


exports.updateTeam = catchAsync(async (req, res, next)=>{
    const teamId = req.params.id;
    const data = req.body;

    const team = await Team.findById(teamId);
    team.name = data.name;
    team.description = data.description;
    team.email = data.email;
    team.phone = data.phone;
    team.designation = data.designation;

    if (req.files['file'].length) {
        deleteImage(team.image, (err, message) => {
            if (err) {
                console.error('Error deleting image:', err.message);
            } else {
                console.log(message);
            }
        });

        team.image = req.files['file'][0].filename;
        await team.save();
    }


    await team.save();
    return res.status(202).json({
        message: 'Team member updated successfully done',
        status: 'success',
        data: team
    });
});

exports.deleteTeam = catchAsync(async (req, res, next) =>{
    const teamId = req.params.id;
    const team = await Team.findById(teamId);

        deleteImage(team.image, (err, message) => {
            if (err) {
                console.error('Error deleting image:', err.message);
            } else {
                console.log(message);
            }
        });

    await Team.findByIdAndDelete(teamId);

    return res.status(204).json({
        status: 'failure',
        message: 'One team member deleted successfully done',
        data: ''
    });
});


exports.getTeam = catchAsync(async(req, res, next) =>{
    const features = new APIFeatures(Team.find(), req.query)
        .paginate();
    const project = await features.query.lean();
    const allResult = new APIFeatures(Team.find(), req.query);
    const all = await allResult.query;
    return res.status(200).json({
        status: "success",
        results: project.length,
        all_result: all.length,
        data: project,
    });
});

exports.getSingleTeam = catchAsync(async (req, res, next) =>{
const postId = req.params.id;
const team = await Team.findById(postId);
    return res.status(200).json({
        status: "success",
        data: team
    });
});



