const { Thought, User } = require('../models')

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find({})
                res.json(users);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },

    // get one user by id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate("friends")
            .populate("thoughts");
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },

    // createUser
    async createUser (req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },

    // updateUser
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },

    // deleteUser
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },

    // addFriend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },

    // deleteFriend
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    }
    };

