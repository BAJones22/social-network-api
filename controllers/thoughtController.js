const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.sendStatus(400);
            }
            );
    },

    // get one thought by id
    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            }
            )
            .catch(err => {
                res.sendStatus(400);
            }
            );
    },

    // createThought
    async createThought({ body }, res) {
        try {
            const dbThoughtData = await Thought.create(body);
            const dbUserData = await User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            res.sendStatus(400);
        }
    },

    // update thought by id
    async updateThought({ params, body }, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: params.id },
                body,
                { new: true, runValidators: true }
            );
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            res.sendStatus(400);
        }
    },

    // delete thought
    async deleteThought({ params }, res) {
        try {
            const dbThoughtData = await Thought.findOneAndDelete({ _id: params.id });
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            const dbUserData = await User.findOneAndUpdate(
                { username: dbThoughtData.username },
                { $pull: { thoughts: params.id } },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json({ message: 'Thought successfully deleted!' });
        }
        catch (err) {
            res.sendStatus(400);
        }
    },

    // add reaction
    async addReaction({ params, body }, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            );
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            res.sendStatus(400);
        }
    }
    ,

    // delete reaction
    async deleteReaction({ params }, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            );
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json({ message: 'Reaction successfully deleted!' });
        } catch (err) {
            res.sendStatus(400);
        }
    }
};

module.exports = thoughtController;




