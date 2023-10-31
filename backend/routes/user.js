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





const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

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
      const token = await newUser.generateAuthtoken();




      // Respond with the token and a success message
      res.status(201).json({ user: newUser, token, message: 'Signup successful' });
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
  
      res.status(200).json({ message: 'Login successful' });
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
  






  router.post('/verify', async (req, res) => {
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





// // Define an API endpoint to fetch leads
// router.get('/fetch-status', async (req, res) => {
//   try {
//     const leadsWithNullStatus = await Lead.find({ status: null });

//     res.json(leadsWithNullStatus);
//     console.log(leadsWithNullStatus, "leads with null status");
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



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




  // API endpoint for submitting leads
  router.post('/submit-lead', async (req, res) => {
    const { businessname, note, country, phone, email, city, contact, state, service ,status} = req.body;


  try {
    const newLead = new Lead({
      businessname,
      note,
      country,
      phone,
      email,
      city,
      contact,
      state,
      service,
      status
    });

    await newLead.save();


    // await sendEmail({
    //   to: 'idendtmedia@gmail.com',
    //   subject: 'New Lead Submission',
    //   text: `A new lead has been submitted:\n\n${JSON.stringify(req.body, null, 2)}`,
    // text: `A new lead has been submitted:\n\nBusiness Name: ${businessname}\nNote: ${note}\nCountry: ${country}\nPhone: ${phone}\nEmail: ${email}\nCity: ${city}\nContact: ${contact}\nState: ${state}\nService: ${service}\nStatus: ${status}`,

    // });

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

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    lead.status = newStatus;
    await lead.save();

    res.json({ message: 'Lead status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// async function sendEmail({ to, subject, text }) {
  
//   const mailOptionsNew = {
//     from: 'your-gmail-account@gmail.com', // Replace with your Gmail email
//     to,
//     subject,
//     text,
//   };

  // await transporter.sendMail(mailOptionsNew);
// }

  

module.exports = router;
