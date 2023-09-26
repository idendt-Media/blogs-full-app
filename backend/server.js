const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer'); // Import multer
const { v4: uuidv4 } = require('uuid'); // Import uuid to generate unique filenames
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

// Body parser middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.static("public"));

// Connect to MongoDB
try {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
} catch (error) {
    console.error(error.message);
}

































































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

// Define a Mongoose model for blog posts
const blogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    fullContent: String,
    imageUrl: String,
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// API route for creating a new blog post with image upload
app.post('/api/blog', upload.single('image'), async (req, res) => {
    try {
        const { title, content ,fullContent } = req.body;
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
app.get('/api/blog', async (req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.json(blogPosts);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});








// API s fro jobs section 






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


// Define a Mongoose model for blog posts
const JobPostSchema = new mongoose.Schema({
    title: String,
    desc: String,
    imageUrlJob: String,
});

const jobPost = mongoose.model('jobPost', JobPostSchema);

// API route for creating a new blog post with image upload
app.post('/api/job', uploadJob.single('image'), async (req, res) => {
    try {
        const { title,desc  } = req.body;
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
app.get('/api/job', async (req, res) => {
    try {
        const jobPosts = await jobPost.find();
        res.json(jobPosts);
        console.log(jobPosts ,"vaadaa");
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});







//de;et API


// DELETE API route for deleting a job post by ID
app.delete('/api/job/:id', async (req, res) => {
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





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
