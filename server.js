import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from './routes/categoryRoutes.js'; // Import the category routes
import subCategoryRoutes from './routes/subCategoryRoutes.js';
import tagRoutes from './routes/tagRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import jobRoutes from './routes/jobRoutes.js';
import cors from "cors";

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from 'path'
import fs from 'fs'


dotenv.config();
connectDB();



const app = express();


cloudinary.config({
  cloud_name: "dfim2ipdh",
  api_key: "495874135955515",
  api_secret: "kglCYM7kNvpEImAhr-va9sUyb-M",
});

const allowedOrigins = new Set([
  "http://localhost:3001",
  "http://localhost:4000",
  "http://localhost:3000",
  "https://job-pakki-admin.vercel.app"
]);

// CORS middleware setup
app.use(
  cors({
    origin: (origin, callback) => {
      // If origin is undefined (like Postman or curl), allow it
      
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        // console.log("Origin:", origin);
      } else {
        console.warn("Blocked CORS request from:", origin);
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true, // Allows cookies and session headers
  })
);

// Middleware

// List of frontend origins that are allowed to access your API


// var whitelist = ['http://localhost:3000','http://localhost:4000', 'http://127.0.0.1:4000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors()); 

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/catagory", categoryRoutes);
app.use("/api/subcatagory", subCategoryRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/job", jobRoutes);



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Image upload route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    // Delete file from local storage after upload
    fs.unlinkSync(req.file.path);

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Image upload failed", details: error.message });

      console.log(error)
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
