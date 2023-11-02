// const mongoose = require('mongoose');
// // Mongoose model
// const leadSchema = new mongoose.Schema({
//     businessname: String,
//     note: String,
//     country: String,
//     phone: String,
//     email: String,
//     city: String,
//     contact: String,
//     state: String,
//     // status:Boolean,
//     status:String,
//     service: [String]// Assuming 'service' is an array of strings

//   });
  
//   const Lead = mongoose.model('Lead', leadSchema);


//   module.exports = Lead ;



const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  businessname: String,
  note: String,
  country: String,
  phone: String,
  email: String,
  city: String,
  contact: String,
  state: String,
  status: String,
  service: [String],
});

const leadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  submissions: [submissionSchema],
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
