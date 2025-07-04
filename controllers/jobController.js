import Job from '../models/JobModel.js';
import slugify from "slugify";
import SubCategory from '../models/SubCategory.js';
// Create a new job
export const createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      slug: slugify(req.body.slug).toLowerCase(),
    });


    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('category subCategory');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetJobByCategory = async (req, res) => {
  try {
    const subcatagory = await SubCategory.findOne({ slug: req.params.slug });

    if (!subcatagory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const job = await Job.find({
      subCategory: subcatagory._id,
      status: 'Active'
    }).populate('category subCategory')
      .sort({ status: 1 }); // 'Active' comes before 'Inactive' if using alphabetical sort

    res.status(200).json(job);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// Get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('category subCategory');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single job by slug
export const getJobBySlug = async (req, res) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug }).populate('category subCategory');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update a job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, {
      ...req.body,
      slug: slugify(req.body.slug).toLowerCase(),
    }, { new: true });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const updateStatus = async (req, res) => {
  try {

    let jobs = await Job.findById(req.params.id)


    if (!jobs) return res.status(404).json({ error: "Job not found" });

    if (jobs.status === 'Inactive') {
      jobs.status = 'Active'
    } else {
      jobs.status = 'Inactive'
    }

    const Jobs = await jobs.save()

    res.json(Jobs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
