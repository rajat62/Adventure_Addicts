import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req)=>{
      if(localStorage.getItem("profile")){
            req.headers.Authorization = `Bearer ${
                  JSON.parse(localStorage.getItem("profile")).token
            }`
      }
      return req;
})

export const signIn = (formData)=>{
      API.post("/users/signin", formData)
}
export const signUp = (formData)=>{
      API.post("/users/signup", formData)
}
export const googleSignUp = (result)=>{
      API.post("/users/googlesignin", result)
}

export const createTour =(tourData)=>{
      API.post("/tour", tourData)
}
export const getTours =(page)=>{
      API.get(`/tour?page=${page}`)
}
export const getTour =(id)=>{
      API.get(`/tour/${id}`)
}
export const deleteTour =(id)=>{
      API.delete(`/tour/${id}`)
}
export const UpdateTourData =(updatedTourData,id)=>{
      API.patch(`/tour/${id}`, updatedTourData)
}
export const getToursByUser =(id)=>{
      API.get(`/tour/usertours/${id}`)
}
export const getToursBySearch = (searchQuery)=>{
      API.get("/tour/search", searchQuery)
}
export const getTagTours = (tag)=>{
      API.get(`/tour/tag/${tag}`)
}
export const getRelatedTours = (tags)=>{
      API.post(`/relatedtours`, tags)
}

export const likeTour = (id)=>{
      API.patch(`/tour/like/${id}`)
}