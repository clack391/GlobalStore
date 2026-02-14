const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    /*
        #swagger.tags = ['Orders']
        #swagger.summary = 'Get all orders'
    */
    try {
        const result = await mongodb.getDb().collection('orders').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    /*
        #swagger.tags = ['Orders']
        #swagger.summary = 'Get a single order by ID'
    */
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid order id to find an order.');
        }
        const orderId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('orders').find({ _id: orderId }).toArray();
        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        } else {
            res.status(404).json('Order not found.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createOrder = async (req, res) => {
    /*
        #swagger.tags = ['Orders']
        #swagger.summary = 'Create a new order'
    */
    try {
        const order = {
            userId: req.body.userId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            status: req.body.status
        };
        const response = await mongodb.getDb().collection('orders').insertOne(order);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the order.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateOrder = async (req, res) => {
    /*
        #swagger.tags = ['Orders']
        #swagger.summary = 'Update an order by ID'
    */
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid order id to update an order.');
        }
        const orderId = new ObjectId(req.params.id);
        const order = {
            userId: req.body.userId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            status: req.body.status
        };
        const response = await mongodb.getDb().collection('orders').replaceOne({ _id: orderId }, order);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the order.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteOrder = async (req, res) => {
    /*
        #swagger.tags = ['Orders']
        #swagger.summary = 'Delete an order by ID'
    */
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid order id to delete an order.');
        }
        const orderId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('orders').deleteOne({ _id: orderId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the order.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createOrder,
    updateOrder,
    deleteOrder
};
