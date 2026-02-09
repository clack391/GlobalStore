const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("users").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to find a contact.");
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .collection("users")
      .find({ _id: userId })
      .toArray();
    if (result.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result[0]);
    } else {
      res.status(404).json("User not found.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = {
      oauthId: req.body.oauthId,
      username: req.body.username,
      avatar: req.body.avatar,
      role: req.body.role || "user",
    };
    const response = await mongodb.getDb().collection("users").insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while creating the user.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to update a contact.");
    }
    const userId = new ObjectId(req.params.id);
    const user = {
      oauthId: req.body.oauthId,
      username: req.body.username,
      avatar: req.body.avatar,
      role: req.body.role || "user", // Allow updating role, default to user if not provided? Or just keep existing? The prompt says "default to 'user'". interpreting as default for creation. I'll include it here but usually updates are partial or replace. I'll stick to replacing fields.
    };
    const response = await mongodb
      .getDb()
      .collection("users")
      .replaceOne({ _id: userId }, user);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the user.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to delete a contact.");
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .collection("users")
      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send(); // 204 No Content
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while deleting the user.");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
