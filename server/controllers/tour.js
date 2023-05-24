import tourModel from "../models/tour.js";

export const createTour = async(req, res)=>{
      const tour = req.body;

      const newTour = new tourModel({
            ...tour, 
            creator: req.userId,
            createdAt: new Date().toISOString()
      })

      try{
            await newTour.save();
            res.status(201).json(newTour);
      }catch(error){
            res.status(404).json({message: "Something went wrong"})
      }
}

export const getTours = async (req, res) => {
      const {page} = req.query;
      try {
        // const tours = await tourModel.find().lean();
        // if (!tours) {
        //   return res.status(404).json({ message: "No tours found" });
        // }
        // res.status(200).json(tours);
        const limit=6;
        
        const startIndex= ((Number(page)-1) *limit);
        
        const total = await tourModel.countDocuments({});
        const tours= await tourModel.find().limit(limit).skip(startIndex);
        res.status(200).json({
          data:tours,
          currentPage: Number(page),
          totalTours: total,
          numberOfPages: Math.ceil(total/limit)
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
};
    
export const getTour = async (req, res) => {

      const {id} = req.params
      try {
        const tour = await tourModel.findById(id).lean();
        if (!tour) {
          return res.status(404).json({ message: "No tours found" });
        }
        res.status(200).json(tour);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
};

import mongoose from 'mongoose';

export const getToursByUser = async (req, res) => {
      const { id } = req.params;
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "User does not exist" });
      }
    
      try {
        const userTours = await tourModel.find({ creator: id });
        res.status(200).json(userTours);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
};
    
export const deleteTour  = async (req, res)=>{
        const { id} = req.params;

        try{

          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No tour exist with id ${id}`});
          }
  
          await tourModel.findByIdAndRemove(id);
  
          res.json({message: "tour deleted successfully"})
        }catch (error) {
          console.log(error);
          res.status(500).json({ message: "Internal server error" });
        }
}
export const updateTour  = async (req, res)=>{
        const { id} = req.params;
        const { title, description, tags, creator, imageFile} = req.body;


        try{

          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No tour exist with id ${id}`});
          }
  
          const updatedTour  = {
            creator,title,description, tags, imageFile, _id: id
          }
          
          await tourModel.findByIdAndUpdate(id, updatedTour, {new:true})
          res.json(updatedTour);
        }catch (error) {
          console.log(error);
          res.status(500).json({ message: "Internal server error" });
        }
}

export const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  

  console.log(req.query)
  try {
    const title = new RegExp(searchQuery, "i");
    const tours = await tourModel.find({ title: { $regex: title } });
    res.json(tours);
    
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
export const getToursByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const tours= await tourModel.find({tags: {$in: tag}});
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
export const getRelatedTours = async (req, res) => {
  const { tags } = req.body;
  console.log(req.body)
  try {
    const tours= await tourModel.find({tags: {$in: tags}});
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const likeTour =async (req, res)=>{
  const {id}= req.params;
  
  try{
    if(!req.userId){
      return res.json({messgae:"user is not autherized"})
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id ${id}`});
    }
    const tour = await tourModel.findById(id)

    let index = tour.likes.findIndex((id)=> id===String(req.userId))

   
    console.log("This is index "+index)
    if(index === -1){
      tour.likes.push(req.userId)
    }else{
      tour.likes = tour.likes.filter((id)=> id !== String(req.userId));
    }
  
    const updatedTour= await tourModel.findByIdAndUpdate(id, tour, {new: true})
  
    res.status(200).json(updatedTour)
  }catch(error){
    console.log("error in backend")
    return res.status(400).json({message:"something went wrong"})
  }

  
}