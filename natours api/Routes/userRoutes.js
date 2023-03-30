const express = require('express');
const authController = require('./../controllers/authController');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const getAllusers = catchAsync(async(req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: "success",
       Data: { 
        users
      }
    });
});

const getUser = (req, res) => {
    res.status(500).json({
        status: "success",
        message: "This route is not implemented yet"
    });
};

const createUser = (req, res) => {
    res.status(500).json({
        status: "success",
        message: "This route is not implemented yet"
    });
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: "success",
        message: "This route is not implemented yet"
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: "success",
        message: "This route is not implemented yet"
    });
};

const router = express.Router();

router.post('/signUp', authController.signUp);
router.post('/login', authController.login);


router.route('/')
.get(getAllusers)
.post(createUser);

router.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;