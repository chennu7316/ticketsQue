const express = require('express');
const router = express.Router();
const Post = require("../models/postModel"); // Adjust the path as needed
const User = require("../models/model"); 


// Create (POST) a new post
router.post('/createPost', async (req, res) => {
  try {
    req.body.createdAt=new Date()
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Create Post Failure' });
  }
});

// Read (GET) all posts
router.get('/getAllPosts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Get Posts Failure' });
  }
});

// Read (GET) a specific post by ID
router.get('/getPostById/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Get Post Failure' });
  }
});

// Update (PUT) a specific post by ID
router.put('/updatePost', async (req, res) => {
  try {
    req.body.updatedAt=new Date()
    const updatedPost = await Post.findByIdAndUpdate(req.body.id, req.body, { new: true });
    if (updatedPost) {
      res.status(200).json({message:"update has done"});
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update Post Failure' });
  }
});

// Delete (DELETE) a specific post by ID
router.delete('/deletePost/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndRemove(req.params.id);
    if (deletedPost) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Delete Post Failure' });
  }
});
router.get('/getPostByUserId/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const post = await Post.findOne({userId:req.params.userId})
      let data={};
      data={
        userData:user,
        postData:post
      }


      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Get Post Failure' });
    }
  });
module.exports = router;
