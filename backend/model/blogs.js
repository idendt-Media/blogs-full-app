const mongoose = require('mongoose');

// Define a Mongoose model for blog posts
const blogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    fullContent: String,
    imageUrl: String,
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Export the BlogPost model
module.exports = BlogPost;
