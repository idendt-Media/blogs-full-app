const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Assuming BlogPost is defined somewhere in your code
const BlogPost = require('../model/blogs'); // Adjust the path accordingly
const jobPost = require('../model/jobs'); // Adjust the path accordingly

// Configure multer to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Blogs'); // Store uploaded files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, uuidv4() + extension); // Rename the file with a unique name (UUID)
    },
});

const upload = multer({ storage });





// API s for jobs section
const jobStorage = multer.diskStorage({
    destination: (req, fileJob, cb) => {
        cb(null, 'public/jobs'); // Store uploaded files in the 'public/jobs' directory
    },
    filename: (req, fileJob, cb) => {
        const extensionJob = path.extname(fileJob.originalname);
        cb(null, uuidv4() + extensionJob); // Rename the file with a unique name (UUID)
    },
});

const uploadJob = multer({ storage: jobStorage });












// API route for creating a new blog post with image upload
router.post('/blog', upload.single('image'), async (req, res) => {
    try {
        const { title, content, fullContent } = req.body;
        const imageUrl = req.file.filename; // Use the generated filename as the image URL

        // Create a new blog post
        const newBlogPost = new BlogPost({ title, content, fullContent, imageUrl });
        await newBlogPost.save();

        res.status(201).json(newBlogPost);
        console.log(newBlogPost);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define an API endpoint to fetch blog posts
router.get('/blog', async (req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.json(blogPosts);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});







// API route for creating a new blog post with image upload
router.post('/job', uploadJob.single('image'), async (req, res) => {
    try {
        const { title, desc } = req.body;
        const imageUrlJob = req.file.filename; // Use the generated filename as the image URL

        // Create a new blog post
        const newJobPost = new jobPost({ title, desc, imageUrlJob });
        await newJobPost.save();

        res.status(201).json(newJobPost);
        console.log(newJobPost);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define an API endpoint to fetch blog posts
router.get('/job', async (req, res) => {
    try {
        const jobPosts = await jobPost.find();
        res.json(jobPosts);
        console.log(jobPosts, "vaadaa");
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE API route for deleting a job post by ID
router.delete('/job/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        console.log(jobId);

        // Use mongoose to find and delete the job post by ID
        const deletedJobPost = await jobPost.findByIdAndDelete(jobId);

        if (!deletedJobPost) {
            return res.status(404).json({ error: 'Job post not found' });
        }

        res.json({ message: 'Job post deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;



