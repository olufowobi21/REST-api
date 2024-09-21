const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

app.use(express.json());

// GET: Return all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST: Add a new user to the database
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user' });
  }
});

// PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndRemove(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
});