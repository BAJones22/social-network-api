const router = require('express').Router();
const {
    getUsers,
    getSingeUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

