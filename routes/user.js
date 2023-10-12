const express = require('express');
const router = express.Router();
const User = require("../models/model"); 


router.post('/createUser', async (req, res) => {
    try {
        console.log(req.body?.email)
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      const newUser = new User(req.body);
      newUser.save()

      res.status(200).json({ message: 'Create User Successful' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Create User Failure' });
    }
  });
  

// Retrieve all users
router.get('/getAllUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Get Users Failure' });
  }
});
router.get('/getUser/:id', async (req, res) => {
    try {
      const users = await User.findOne({_id:req.params.id});
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Get Users Failure' });
    }
  });
// Delete a user by _id
router.delete('/deleteUser/:_id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params._id);
    res.status(200).json({ message: 'Delete User Successful' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Delete User Failure' });
  }
});

// Update a user by _id
router.put('/updateUser', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.id, req.body);
    res.status(200).json({ message: 'User Update Successful' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'User Update Failure' });
  }
});

module.exports = router;
