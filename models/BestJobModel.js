import mongoose from 'mongoose';

const BestJobSchema = new mongoose.Schema({
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


    images: {
  type: [String],
  default: [],
},

    link: {
  type: [String],
},

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const BestJob = mongoose.model('BestJob', BestJobSchema);

export default BestJob;
