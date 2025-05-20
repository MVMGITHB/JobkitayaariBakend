import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import  sendVerificationEmail from "../utils/sendEmail.js";

import slugify from 'slugify';


// @desc   Register a new user
// @route  POST /api/auth/register
// @access Public



  //   shortBio:{
  //      type:String,
  //   },

  //   tag:{
  //     type:String,
  //   },


  //   slug: {
  //     type: String,
  //     // unique: true,
  //     index: true,
  //   },

  //   socialMedia: {
  //     facebook: { type: String },
  //     linkedin: { type: String },
  //     twitter: { type: String },
  //     profile: { type: String }
  // },

  //  blog: [{ type: ObjectId, ref: "Blog" }],
  // },

export const registerUser = async (req, res) => {
  const { name, email, phone, password, dateOfBirth, specialization ,role,shortBio,tag,slug,socialMedia,blog,image} = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      phone,
      password,
      dateOfBirth,
      specialization,
      verificationToken,
      role,
      shortBio,
      tag,
      slug:slug?slugify(req.body.slug).toLowerCase():"",
      socialMedia,
      blog,
      image,
    });

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: "User registered. Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    console.log(error)
  }
};







// @desc   Login user via email or phone
// @route  POST /api/auth/login
// @access Public
export const loginUser = async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or phone

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(res, user._id);
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          specialization: user.specialization,
          role:user.role
        },
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid email/phone or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    console.log(error)
  }
};

// @desc   Logout user
// @route  POST /api/auth/logout
// @access Private
export const logoutUser = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
};



export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllUser = async(req,res)=>{
   try {
       const users = await User.find({});
       if(!users){
        return res.status(400).json({message:"Users not found"})
       }

       res.status(200).json({
        message:"Users find successfully",
        users:users
       })

   } catch (error) {
    res.status(500).json({ message: "Server Error", error });
   }
}


export const getAllAdmin = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ['admin', 'superAdmin', 'seoAdmin'] }
    }); // 👈 Explicitly include password

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No admin users found" });
    }

    res.status(200).json({
      message:"Users find successfully",
      users:users
     })
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


 export const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

     const { name, email, phone, dateOfBirth, specialization ,role,shortBio,tag,slug,socialMedia,blog,image} = req.body;

    if (email) user.email = email;
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (image) user.image = image;
    if (role) user.role = role;
    if (shortBio) user.shortBio = shortBio;
    if (tag) user.tag = tag;
    if (specialization) user.specialization = specialization;
    if (socialMedia) user.socialMedia = socialMedia;
    if(slug) user.slug = slugify(slug).toLowerCase()

    // Append new blog ID(s) instead of replacing
    if (blog) {
      if (Array.isArray(blog)) {
        user.blog.push(...blog); // Add multiple blog IDs
      } else {
        user.blog.push(blog); // Add a single blog ID
      }
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserByslug= async(req,res)=>{
      try {
          
        const user = await User.find({slug:req.params.slug}).populate({
          path: 'blog',
          populate: [
            { path: 'category', model: 'Category' },
            { path: 'subCategory', model: 'SubCategory' }
          ]
        });
        if(!user){
          res.status(400).json({message:"User not found"})
        }
        res.status(200).json(user)
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
}



export const updateStatus = async (req, res) => {
  try {

    let Users = await User.findById(req.params.id)
   

    if (!Users) return res.status(404).json({ error: "Blog not found" });

    if(Users.status ==='Inactive')  {
      Users.status ='Active'
    }else{
      Users.status ='Inactive'
    }

   const users =  await  Users.save()

    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
