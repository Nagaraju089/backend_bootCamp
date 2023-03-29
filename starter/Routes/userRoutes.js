const express = require('express');
const getAllusers = (req, res) => {
    res.status(500).json({
        status: "success",
        message: "This route is not implemented yet"
    });
};

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

router.route('/')
.get(getAllusers)
.post(createUser);

router.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;