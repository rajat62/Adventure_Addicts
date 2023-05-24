import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req)=>{
      if(localStorage.getItem("profile")){
            req.headers.Authorization = `Bearer ${
                  JSON.parse(localStorage.getItem("profile")).token
            }`
      }
      return req;
})

export const createTour = createAsyncThunk("tour/createTour", async ({updatedTourData, navigate,toast}, {rejectWithValue})=>{
      try{
            
        const res = await API.post("/tour", updatedTourData);
        toast.success("tour Added successfully");
        navigate("/");
        return res.data
      }catch(error){
        return rejectWithValue(error.response.data)
      }
    })


export const getTours = createAsyncThunk("tour/getTours", async (page, {rejectWithValue})=>{
      try{
            
        const res = await API.get(`/tour?page=${page}`);
        
        return res.data
        console.log(res.data)
      }catch(error){
        return rejectWithValue(error.response.data)
      }
})
export const getTour = createAsyncThunk("tour/getTour", async (id, {rejectWithValue})=>{
      try{
            
        const res = await API.get(`/tour/${id}`);
        return res.data
      }catch(error){
        return rejectWithValue(error.response.data)
      }
    })
export const getToursByUser = createAsyncThunk("tour/getToursByUser", async (userId, {rejectWithValue})=>{
      try{
            
        const res = await API.get(`/tour/usertours/${userId}`);
        return res.data
      }catch(error){
        return rejectWithValue(error.response.data)
      }
    })
export const deleteTour = createAsyncThunk("tour/deleteTour", async ({id, toast}, {rejectWithValue})=>{
      try{
            
        const res = await API.delete(`/tour/${id}`);
        toast.success("Tour deleted successfully");
        return res.data
      }catch(error){
        return rejectWithValue(error.response.data)
      }
    })
export const updateTour = createAsyncThunk("tour/updateTour", async ({id,updatedTourData, toast, navigate}, {rejectWithValue})=>{
      try{
            
        const res = await API.patch(`/tour/${id}`, updatedTourData);
        toast.success("Tour updated successfully");
        navigate("/");
        return res.data
      }catch(error){
        return rejectWithValue(error.response.data)
      }
    })
export const searchTours = createAsyncThunk("tour/searchTours", async (searchQuery, {rejectWithValue})=>{
      try{
            const res = await API.get("/tour/search", { params: { searchQuery } });

        return res.data
      }catch(error){
        return rejectWithValue(error.response.data)
      }
    })
export const getToursByTag = createAsyncThunk("tour/getToursByTag", async (tag, {rejectWithValue})=>{
      try{
            const res = await API.get(`/tour/tag/${tag}`);
        return res.data
      }catch(error){
        return rejectWithValue(error.response.data)
      }
    })
export const getRelatedTours = createAsyncThunk("tour/getRelatedTours", async (tags, {rejectWithValue})=>{
      try{
            const res = await API.post(`tour/relatedtours`, {tags});
            console.log(res.data)
        return res.data
      }catch(error){
        return rejectWithValue(error.response.data)
      }
    })
export const likeTour = createAsyncThunk("tour/likeTour", async (_id, {rejectWithValue})=>{
      try{
        const res = await API.patch(`/tour/like/${_id}`);
        console.log(res.data)
        return res.data
      }catch(error){
        return rejectWithValue(error.response.data)
      }
})

    const tourSlice = createSlice({
      name:"tour",
      initialState: {
            tour: {},
            tours:[],
            userTours:[],
            tagTours:[],
            relatedTours:[],
            currentPage:1,
            numberOfPages:null,
            error: "",
            loading: false
      },
      reducers:{
            setCurrentPage: (state, action)=>{
                  state.currentPage =action.payload;
            }
      },
      extraReducers(builder){
            builder
                  .addCase(createTour.pending, (state,action)=>{
                        state.loading =true;
                  })
                  .addCase(createTour.fulfilled, (state, action)=>{
                        state.loading=  false;
                        state.tours= [action.payload];
                  })
                  .addCase(createTour.rejected, (state, action)=>{
                        state.loading=  false;
                        state.error = action.payload.message;
                  })
                  .addCase(getTours.pending, (state,action)=>{
                        state.loading = true
                  })
                  .addCase(getTours.fulfilled, (state, action)=>{
                        // state.loading=  false;
                        // state.tours= action.payload;
                        state.numberOfPages=action.payload.numberOfPages;
                        state.loading=  false;
                        state.tours= action.payload.data;
                        state.currentPage = action.payload.currentPage;
                  })
                  .addCase(getTours.rejected, (state, action)=>{
                        state.loading=  false;
                        state.error = action.payload.message;
                  })
                  .addCase(getTour.pending, (state,action)=>{
                        state.loading = true
                  })
                  .addCase(getTour.fulfilled, (state, action)=>{
                        state.loading=  false;
                        state.tour= action.payload;
                  })
                  .addCase(getTour.rejected, (state, action)=>{
                        state.loading=  false;
                        state.error = action.payload.message;
                  })
                  .addCase(getToursByUser.pending, (state,action)=>{
                        state.loading = true
                  })
                  .addCase(getToursByUser.fulfilled, (state, action)=>{
                        state.loading=  false;
                        state.userTours= action.payload;
                  })
                  .addCase(getToursByUser.rejected, (state, action)=>{
                        state.loading=  false;
                        state.error = action.payload.message;
                  })
                  .addCase(deleteTour.pending, (state,action)=>{
                        state.loading = true
                  })
                  .addCase(deleteTour.fulfilled, (state, action)=>{
                        state.loading=  false;
                        const {arg: {id}} = action.meta;
                        if(id){
                              state.userTours = state.userTours.filter(
                              (item) =>item._id !== id )
                              state.tours = state.tours.filter(
                              (item) =>item._id !== id )
                        }
                  })
                  .addCase(deleteTour.rejected, (state, action)=>{
                        state.loading=  false;
                        state.error = action.payload.message;
                  })
                  .addCase(updateTour.pending, (state,action)=>{
                        state.loading = true
                  })
                  .addCase(updateTour.fulfilled, (state, action)=>{
                        state.loading=  false;
                        const {arg: {id}} = action.meta;
                        if(id){
                              state.userTours = state.userTours.map(
                              (item) =>item._id === id ?action.payload: item)
                              state.tours = state.tours.map(
                              (item) =>item._id === id? action.payload :item )
                        }
                  })
                  .addCase(updateTour.rejected, (state, action)=>{
                        state.loading=  false;
                        state.error = action.payload.message;
                  })
                  .addCase(searchTours.pending, (state,action)=>{
                        state.loading = true
                  })
                  .addCase(searchTours.fulfilled, (state, action)=>{
                        state.loading=  false;
                        state.tours= action.payload;
                  })
                  .addCase(searchTours.rejected, (state, action)=>{
                        state.loading=  false;
                        state.error = action.payload.message;
                  })
                  .addCase(getToursByTag.pending, (state,action)=>{
                        state.loading = true
                  })
                  .addCase(getToursByTag.fulfilled, (state, action)=>{
                        state.loading=  false;
                        state.tagTours= action.payload;
                  })
                  .addCase(getToursByTag.rejected, (state, action)=>{
                        state.loading=  false;
                        state.error = action.payload.message;
                  })
                  .addCase(getRelatedTours.pending, (state,action)=>{
                        state.loading = true
                  })
                  .addCase(getRelatedTours.fulfilled, (state, action)=>{
                        state.loading=  false;
                        state.relatedTours= action.payload;
                  })
                  .addCase(getRelatedTours.rejected, (state, action)=>{
                        state.loading=  false;
                        state.error = action.payload.message;
                  })
                  .addCase(likeTour.pending, (state,action)=>{
                  })
                  .addCase(likeTour.fulfilled, (state, action)=>{
                        state.loading=  false;
                        const {arg: {_id}} = action.meta;
                        if(_id){
                              
                              state.tours = state.tours.map(
                              (item) =>item._id === _id? action.payload :item )
                        }
                  })
                  .addCase(likeTour.rejected, (state, action)=>{
                        state.error = action.payload.message;
                  })
      }
})
export const {setCurrentPage} = tourSlice.actions;
export default tourSlice.reducer;

