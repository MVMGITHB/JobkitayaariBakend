import slugify from 'slugify';
import Category from '../models/CatagoryModel.js'; // Assuming the model is in the 'models' directory



export const createCategory = async(req,res)=>{
   try {
      const {name,title,para} = req.body;
     const  slug=  slugify(req.body.name).toLowerCase()

      if(!name){
        return res.status(400).json({message:"Please provide category Name"})
      }

      

      const catagory = await Category.findOne({name})

      if(catagory){
         return res.status(400).json({message:"Category Already Exist"})
      }

      const newCategory = new Category({name,title,para,slug})

       await newCategory.save();

       res.status(201).json(newCategory)
   } catch (error) {
      console.log(error);
    return  res.status(500).json({message:`Internal Server Error :${error.message}`})
   }
}



export const getAllCategories = async(req,res)=>{
   try {
      const getAllCategories = await Category.find();

      if(!getAllCategories){
       return res.status(400).json({message:"There is no Category"})
      }

      res.status(200).json(getAllCategories)
   } catch (error) {
    console.log(error);
   return res.status(500).json({message:`Internal Server Error :${error.message}`})
   }
} 

export const getCategoryById = async(req,res)=>{
     
     try {
        const category = await Category.findById(req.params.id)
          if(!category){
            return res.status(400).json({message:"There is no Category"})
           }
     
           res.status(200).json(category)
     } catch (error) {
        console.log(error);
        return res.status(500).json({message:`Internal Server Error :${error.message}`})
     }

}

// Update a category by ID
export const updateCategory = async (req, res) => {
    try {
      const { name,title,para } = req.body;
      const  slug=  slugify(req.body.name).toLowerCase()
      const category = await Category.findByIdAndUpdate(req.params.id, { name:name,title:title,slug:slug,para:para ,updatedAt: Date.now() }, { new: true });
      
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  export const updateStatus = async (req, res) => {
    try {
  
      let Categories = await Category.findById(req.params.id)
     
  
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

export const deleteCategory = async(req,res)=>{
    try {
          const deleteCategory = await Category.findByIdAndDelete(req.params.id);

          if(!deleteCategory){
            return res.status(400).json({message:"Catagory Not Found"});
          }

          res.status(200).json({message:"Category Deleted Successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`Internal Server Error :${error.message}`})
    }
}