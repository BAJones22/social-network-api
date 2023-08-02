const { User } = require('../models')

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',   
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                res.sendStatus(400);
            }
            );
    },

    // get one user by id
    getSingeUser({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch(err => {
                res.sendStatus(400);
            }
            );
    },

    // createUser
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                res.sendStatus(400);
            }
            );
    },

    // updateUser
    updateUser({ params, body }, res) {
        async function updateUser() {
            try {
                const dbUserData = await User.findOneAndUpdate(
                    { _id: params.id },
                    body,
                    { new: true }
                );
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            } catch (err) {
                res.sendStatus(400);
            }
        }
        updateUser();
    },

    // deleteUser
    deleteUser({ params }, res) {
        async function deleteUser() {
            try {
                const dbUserData = await User.findOneAndDelete({ _id: params.id });
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
            catch (err) {
                res.sendStatus(400);
            }
        }
        deleteUser();
    },

    // addFriend
    addFriend({ params }, res) {
        async function addFriend() {
            try {
                const dbUserData = await User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { friends: params.friendId } },
                    { new: true }
                );
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            } catch (err) {
                res.sendStatus(400);
            }
        }
        addFriend();
    },

    // deleteFriend
    deleteFriend({ params }, res) {
        async function deleteFriend() {
            try {
                const dbUserData = await User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { friends: params.friendId } },
                    { new: true }
                );
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            } catch (err) {
                res.sendStatus(400);
            }
        }
        deleteFriend();
    }
};

