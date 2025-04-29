import mongoose from 'mongoose';

// Define the Category Schema
const JobSchema = new mongoose.Schema({
  postName: {
    type: String,
    required: true,
    trim: true,
  },


  Jobtype: {
    type: String,
    enum: ['goven', 'private'],
    default: 'goven',
  },


  mtitle:{
    type:String,
  },

  mdescription:{
    type:String,
  },



  title1: {
    type: String,
    // required: true,
    trim: true,
  },
  title2: {
    type: String,
    // required: true,
    trim: true,
  },
  title3: {
    type: String,
    // required: true,
    trim: true,
  },

  postDate: {
    type: String,
    required: true,
    trim: true,
  },

  lastDate: {
    type: String,
    // required: true,
    trim: true,
  },


  correctionDate: {
    type: String,
    // required: true,
    trim: true,
  },
  adminCardDate: {
    type: String,
    // required: true,
    trim: true,
  },

  shortInformation: {
    type: String,
    // required: true,
    trim: true,
  },
  
 
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Allows categories to have subcategories (optional)
    default: null,
  },


  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory', // Allows sub-categories to have subcategories (optional)
    default: null,
  },



  slug: {
    type: String,
    unique: true,
    index: true,
  },


  applicationfeesG_O_EWs: {
    type: String,
    // required: true,
    trim: true,
  },


  applicationfees_SC_ST: {
    type: String,
    // required: true,
    trim: true,
  },



  paymentMode: {
    type: String,
    // required: true,
    trim: true,
  },


  ageLimit: {
    type: [String],
  },


  totalPost: {
    type: Number,
  },

  requirementHeading:{
    type:String,
  },


  requirementsubHeading:{
    type:String,
  },


  requirementdata:{
    type:[String],
  },


//   generalAreaHeading:{
//     type:String,
//   },


//   generalAreadata:{
//     type:[String],
//   },


//   formProcessHeading:{
//     type:String,
//   },


//   formProcessdata:{
//     type:[String],
//   },

  applylink:{
    type:String
  },


  officialwebsitelink:{
    type:String
  },


  downloadDetailsNotification:{
    type:String
  },


  downloadSllabus:{
    type:String
  },


 image:{
    type:String
  },

  


  location:{
    type:String
  },

  experience:{
    type:String
  },

  salary:{
    type:String
  },


  jobDescription:{
    type:[String]
  },


  skill:{
    type:[String]
  },

 
  createdAt: {
    type: Date,
    default: Date.now,
  },

  status:{
    type:String,
    default:"Inactive"
  },


  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Model for the Category
const Job = mongoose.model('Job', JobSchema);

export default Job;



