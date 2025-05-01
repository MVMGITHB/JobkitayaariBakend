import FeatureJob from '../models/FeaturedJobModel.js';

// Create
export const createFeatureJob = async (req, res) => {
  try {
    const featureJob = new FeatureJob(req.body);
    await featureJob.save();
    res.status(201).json(featureJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all
export const getAllFeatureJobs = async (req, res) => {
  try {
    const featureJobs = await FeatureJob.find().populate({
      path: 'jobs',
      populate: [
        { path: 'category', model: 'Category' },
        { path: 'subCategory', model: 'SubCategory' }
      ]
    });
    res.json(featureJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read one
export const getFeatureJobById = async (req, res) => {
  try {
    const featureJob = await FeatureJob.findById(req.params.id).populate({
      path: 'jobs',
      populate: [
        { path: 'category', model: 'Category' },
        { path: 'subCategory', model: 'SubCategory' }
      ]
    });

    if (!featureJob) return res.status(404).json({ message: 'Not found' });
    res.json(featureJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
export const updateFeatureJob = async (req, res) => {
  try {
    const updated = await FeatureJob.findByIdAndUpdate(
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
export const deleteFeatureJob = async (req, res) => {
  try {
    const deleted = await FeatureJob.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
