const mongoose = require('mongoose');

// Define the Mongoose schema
const postSchema = new mongoose.Schema({
  postName: {
    type: String,
    required: true,
  },
  postDescription: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
