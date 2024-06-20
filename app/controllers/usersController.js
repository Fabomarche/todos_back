import Users from "../models/Users.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).send({ error: 'Username and password are required' });
        }

        const existingUser = await Users.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).send({ error: 'Username already exists' });
        }

        const user = new Users(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ error: 'Error creating user' });
    }
};

export const loginUser = async (req, res) => {
  try {
      if (!req.body.username || !req.body.password) {
          return res.status(400).send({ error: 'Username and password are required' });
      }

      const user = await Users.findOne({ username: req.body.username });
      if (!user) {
          return res.status(400).send({ error: 'Users not found' });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
          return res.status(400).send({ error: 'Invalid password' });
      }
      res.send(user);
  } catch (error) {
      res.status(500).send({ error: 'Server error' });
  }
};
