import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
      },

      slug: {
        type: String,
        unique: true,
        index: true,
      },

      mtitle: {
        type: String,
      },

      mdesc: {
        type: String,
      },

      category:  {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category', 
          default: null,
        },

        subCategory:  {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory', 
            default: null,
          },

          image:{
            type:String,
            default:"https://tse3.mm.bing.net/th?id=OIP.jeIZbiXiDT0YeHnsFCDUEgHaDl&pid=Api&P=0&h=180"
          },

          alt:{
             type :String,
          },

          content:{
            type: String,
             required: true,
          },

          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
          },
        

          faqs: [
            {
              ques: {
                type: String,
                required: true
              },
              ans: {
                type: String,
                required: true
              }
            }
          ],

          tag:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
            default: null,
          },

          status:{
            type:String,
            default:"Inactive"
          },


  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;
