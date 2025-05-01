import mongoose from 'mongoose';

const recentJobSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      default: null
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Inactive"
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const RecentJob = mongoose.model('RecentJob', recentJobSchema);

export default RecentJob;
