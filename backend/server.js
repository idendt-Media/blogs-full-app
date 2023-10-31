const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer'); // Import multer
const { v4: uuidv4 } = require('uuid'); // Import uuid to generate unique filenames
const path = require('path');
require('dotenv').config();
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');


const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

// Body parser middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.static("public"));




app.use('/', userRouter);
app.use('/api', adminRouter);

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
