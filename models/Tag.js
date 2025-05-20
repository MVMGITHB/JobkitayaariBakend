import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    status:{
    type:String,
    default:"Inactive"
  },


  },
  { timestamps: true }
);

const Tag = mongoose.model('Tag', TagSchema);

export default Tag;
