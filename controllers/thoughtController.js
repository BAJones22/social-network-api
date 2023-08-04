const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({})
               
            res.json(thoughts);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },

    // get one thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },
    
    // createThought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            console.log(thought);
            // console.log(user);  
            if (!user) {
                 res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },
    

    // update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },

    // delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },
    
    // add reaction
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    },

    // delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.sendStatus(400).json(err);
        }
    }
};

