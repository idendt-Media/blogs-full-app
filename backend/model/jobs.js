
const mongoose = require('mongoose');



// Define a Mongoose model for blog posts
const JobPostSchema = new mongoose.Schema({
    title: String,
    desc: String,
    imageUrlJob: String,
});

const jobPost = mongoose.model('jobPost', JobPostSchema);

module.exports = jobPost;
