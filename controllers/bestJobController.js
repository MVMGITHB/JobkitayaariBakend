import BestJob from '../models/BestJobModel.js';

// Create
export const createBestJob = async (req, res) => {
  try {
    const bestJob = new BestJob(req.body);
    await bestJob.save();
    res.status(201).json(bestJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all
export const getAllBestJobs = async (req, res) => {
  try {
    const bestJobs = await BestJob.find().populate({
        path: 'jobs',
        populate: [
          { path: 'category', model: 'Category' },
          { path: 'subCategory', model: 'SubCategory' }
        ]
      });
    res.json(bestJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateStatus = async (req, res) => {
    try {
  
      let Categories = await BestJob.findById(req.params.id)
     
  
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

// Read one
export const getBestJobById = async (req, res) => {
  try {
    const bestJob = await BestJob.findById(req.params.id).populate({
        path: 'jobs',
        populate: [
          { path: 'category', model: 'Category' },
          { path: 'subCategory', model: 'SubCategory' }
        ]
      });;
    if (!bestJob) return res.status(404).json({ message: 'Not found' });
    res.json(bestJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
export const updateBestJob = async (req, res) => {
  try {
    const updatedBestJob = await BestJob.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedBestJob) return res.status(404).json({ message: 'Not found' });
    res.json(updatedBestJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
export const deleteBestJob = async (req, res) => {
  try {
    const deleted = await BestJob.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
