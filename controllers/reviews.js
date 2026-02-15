const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    /*
        #swagger.tags = ['Reviews']
        #swagger.summary = 'Get all reviews'
    */
    try {
        const result = await mongodb.getDb().collection('reviews').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    /*
        #swagger.tags = ['Reviews']
        #swagger.summary = 'Get a single review by ID'
    */
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid review id to find a review.');
        }
        const reviewId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('reviews').find({ _id: reviewId }).toArray();
        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        } else {
            res.status(404).json('Review not found.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createReview = async (req, res) => {
    /*
        #swagger.tags = ['Reviews']
        #swagger.summary = 'Create a new review'
    */
    try {
        const review = {
            productId: req.body.productId,
            userId: req.body.userId,
            rating: req.body.rating,
            comment: req.body.comment
        };
        const response = await mongodb.getDb().collection('reviews').insertOne(review);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the review.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateReview = async (req, res) => {
    /*
        #swagger.tags = ['Reviews']
        #swagger.summary = 'Update a review by ID'
    */
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid review id to update a review.');
        }
        const reviewId = new ObjectId(req.params.id);
        const review = {
            productId: req.body.productId,
            userId: req.body.userId,
            rating: req.body.rating,
            comment: req.body.comment
        };
        const response = await mongodb.getDb().collection('reviews').replaceOne({ _id: reviewId }, review);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the review.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteReview = async (req, res) => {
    /*
        #swagger.tags = ['Reviews']
        #swagger.summary = 'Delete a review by ID'
    */
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid review id to delete a review.');
        }
        const reviewId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('reviews').deleteOne({ _id: reviewId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the review.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createReview,
    updateReview,
    deleteReview
};
