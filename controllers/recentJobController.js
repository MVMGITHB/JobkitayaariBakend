import RecentJob from '../models/RecentJobModel.js';

// Create
export const createRecentJob = async (req, res) => {
  try {
    const recentJob = new RecentJob(req.body);
    await recentJob.save();
    res.status(201).json(recentJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const updateStatus = async (req, res) => {
    try {
  
      let Categories = await RecentJob.findById(req.params.id)
     
  
      if (!Categories) return res.status(404).json({ error: "Blog not found" });
  
      if(Categories.status ==='Inactive')  {
        Categories.status ='Active'
      }else{
        Categories.status ='Inactive'
      }
  
     const Categori =  await  Categories.save()
  
      res.json(Categori);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

// Read all
export const getAllRecentJobs = async (req, res) => {
  try {
    const recentJobs = await RecentJob.find().populate({
      path: 'jobs',
      populate: [
        { path: 'category', model: 'Category' },
        { path: 'subCategory', model: 'SubCategory' }
      ]
    });
    res.json(recentJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read one
export const getRecentJobById = async (req, res) => {
  try {
    const recentJob = await RecentJob.findById(req.params.id).populate({
      path: 'jobs',
      populate: [
        { path: 'category', model: 'Category' },
        { path: 'subCategory', model: 'SubCategory' }
      ]
    });

    if (!recentJob) return res.status(404).json({ message: 'Not found' });
    res.json(recentJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
export const updateRecentJob = async (req, res) => {
  try {
    const updated = await RecentJob.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
export const deleteRecentJob = async (req, res) => {
  try {
    const deleted = await RecentJob.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
