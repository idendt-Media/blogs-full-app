const cors = require('cors');
const express = require('express');
const app = express();

const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");


app.use(cors());

// Your admin route handling code here
const User = require('../model/signup'); // Adjust the path accordingly
const userotp = require("../model/userOtp");
const Lead = require("../model/Leads");
// const users = require("../model/userSchema");
const jwt = require('jsonwebtoken');
const { error } = require('console');
const multer = require('multer');





const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})




const authenticateToken = (req, res, next) => {
  let authHeader = req.headers.authorization;
  
  if (authHeader === undefined) {
    res.status(401).send({ error: "No token provided" });
    return;  // Add return statement to exit the function if no token is provided
  }

  let token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).send({ error: "Authentication failed" });
    } else {
      next();
    }
  });
};

module.exports = authenticateToken;


// module.exports = authenticateToken;












// Update the signup route in `server.js`
router.post('/signup', async (req, res) => {
  const { username, password, email, phone ,company,state,city} = req.body;

  try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with hashed password and phone number
      const newUser = new User({ username, password: hashedPassword, phone, email ,company,state,city });

      // Save the user to the database
      await newUser.save();

      // Generate and attach a JWT token
      // const token = await newUser.generateAuthtoken();





      // Respond with the token and a success message
      res.status(201).json({ user: newUser,  message: 'Signup successful' });
  } catch (error) {
      // Handle errors appropriately
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});




  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }


      const token = jwt.sign({ email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });


      const OTP = Math.floor(100000 + Math.random() * 900000);

            const existEmail = await userotp.findOne({ email: email });


            if (existEmail) {
                const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
                    otp: OTP
                }, { new: true }
                );
                await updateData.save();

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Eamil For Otp Validation",
                    text: `OTP:- ${OTP}`
                }


                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })

            } else {

                const saveOtpData = new userotp({
                    email, otp: OTP
                });

                await saveOtpData.save();
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Eamil For Otp Validation",
                    text: `OTP:- ${OTP}`
                }

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })
            }
  
      res.status(200).json({ message: 'Login successful', token});
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: 'Internal Server Error' });    }
  });




  router.post('/login-user', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }


  
      res.status(200).json({ message: 'Login successful' });
console.log("login sucess");

    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: 'Internal Server Error' });    }
  });
  






  router.post('/verify',  async (req, res) => {
    const { email, otp } = req.body;
    // console.log("vanammmmmmm");
  
    if (!otp || !email) {
      return res.status(400).json({ error: "Please Enter Your OTP and email" });
    }
  
    try {
      const otpverification = await userotp.findOne({ email: email });
  
      if (otpverification.otp === otp) {
        const preuser = await User.findOne({ email: email });
  
        // token generate
        const token = await preuser.generateAuthtoken();
        return res.status(200).json({ message: "User Login Successfully Done", userToken: token });
  
      } else {
        return res.status(400).json({ error: "Invalid Otp" });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid Details" });
    }
  });



// Define an API endpoint to fetch a lead by ID with null status
router.get('/fetch-status/:leadId', async (req, res) => {
  const leadId = req.params.leadId;

  try {
    const data = await Lead.findOne({ _id: leadId});

 

    res.json(data);
    // console.log(data, 'lead with null status');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})




// Define an API endpoint to fetch lead status
router.get('/submited-data', async (req, res) => {
  try {
      const leadsData = await Lead.find();
      res.json(leadsData);
      // console.log(leadsData, "vaadaa");
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/leads', async (req, res) => {
  try {
    const email = req.query.email;
    console.log(email);

    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }

    const leads = await Lead.find({ email });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.post('/submit-lead', async (req, res) => {
  const { businessname, note, country, phone, email, city, contact, state, service, status } = req.body;

  try {
    // Check if a lead with the same email already exists
    const existingLead = await Lead.findOne({ email });

    if (existingLead) {
      // If a lead exists, update it by pushing the new data into the submissions array
      existingLead.submissions.push({
        businessname,
        note,
        country,
        phone,
        email,
        city,
        contact,
        state,
        service,
        status,
      });

      await sendEmail(
        'idendtmedia@gmail.com', // <-- Provide the recipient email address here
        'New Lead Submission',
        // `A new lead has been submitted:\n\n${JSON.stringify(req.body, null, 2)}` +
        `\nBusiness Name: ${businessname}\nNote: ${note}\nCountry: ${country}\nPhone: ${phone}\nEmail: ${email}\nCity: ${city}\nContact: ${contact}\nState: ${state}\nService: ${service}\nStatus: ${status}`
      );
      

      await existingLead.save();

      // Additional actions if needed, e.g., sending an email
    } else {
      // If a lead doesn't exist, create a new lead with the initial submission
      const newLead = new Lead({
        email,
        submissions: [{
          businessname,
          note,
          country,
          phone,
          email,
          city,
          contact,
          state,
          service,
          status,
        }],
      });

      await newLead.save();

      await sendEmail(
        'idendtmedia@gmail.com', // <-- Provide the recipient email address here
        'New Lead Submission',
        // `A new lead has been submitted:\n\n${JSON.stringify(req.body, null, 2)}` +
        `\nBusiness Name: ${businessname}\nNote: ${note}\nCountry: ${country}\nPhone: ${phone}\nEmail: ${email}\nCity: ${city}\nContact: ${contact}\nState: ${state}\nService: ${service}\nStatus: ${status}`
      );
      

      // Additional actions if needed, e.g., sending an email
    }

    res.status(201).json({ message: 'Lead submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// API endpoint for updating lead status
router.post('/update-lead-status/:leadId', async (req, res) => {
  const { leadId } = req.params;
  const { newStatus } = req.body;

  try {
    const lead = await Lead.findById(leadId);
    console.log(lead);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

 // Find the correct submission by its _id
 const submissionToUpdate = lead.submissions.find((submission) => submission._id.toString() === req.body.submissionId);

 if (!submissionToUpdate) {
   return res.status(404).json({ error: 'Submission not found' });
 }

 // Update the status of the found submission
 submissionToUpdate.status = newStatus;    await lead.save();

    res.json({ message: 'Lead status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Remove the duplicate declaration of `sendEmail`
async function sendEmail(to, subject, text) {
  try {
      // send mail with defined transport object
      const info = await transporter.sendMail({
          from: 'your-gmail-account@gmail.com',
          to,
          subject,
          text,
      });

      console.log('Email sent: ', info.messageId);
      return info;
  } catch (error) {
      console.error('Error sending email: ', error.message);
      throw error; // Re-throw the error to handle it in the calling function
  }
}

// ... (rest of your code)




// Handle the route for sending converted emails
router.post('/send-converted-email', (req, res) => {
  // Get the email address from the request
  const { email } = req.body;
  console.log(email);

  // Additional logic if needed...

  // Send the email
  sendEmail(email, 'Subject: Converted Email', 'Your converted email content')
    .then(() => res.status(200).send('Email sent successfully'))
    .catch((error) => res.status(500).send(`Error sending email: ${error.message}`));
});
  




// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



// Define the route for sending emails
router.post('/send-email', upload.single('resume'), async (req, res) => {
  try {
    // Extract other form data
    const { name, email, phoneNumber, qualification, message ,jobName} = req.body;

    // Extract the resume file from the request
    const resume = req.file;

    // Check if a file is attached
    if (!resume) {
      return res.status(400).json({ error: 'No file attached' });
    }

    // Define the email content
    const mailOptions = {
      from: email,
      to: 'recipient-email@example.com', // Replace with the recipient's email
      subject: 'Job Application',
      text: `
      Applying for the post of: ${jobName}

        Name: ${name}
        Email: ${email}
        Phone Number: ${phoneNumber}
        Qualification: ${qualification}
        Message: ${message}
      `,
      attachments: [
        {
          filename: 'resume.pdf', // Adjust the filename
          content: resume.buffer,
          encoding: 'base64',
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Error sending email' });
  }
});






module.exports = router;
