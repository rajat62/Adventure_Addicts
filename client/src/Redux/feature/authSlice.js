import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
import {signIn} from '../api'
export const login = createAsyncThunk("auth/login", async ({formValue, navigate,toast}, {rejectWithValue})=>{
  try{
    const res = await axios.post("http://localhost:5000/users/signin", formValue);
    toast.success("login successfully");
//     console.log(res.data);
    navigate("/");
    return res.data
    console.log(res)
  }catch(error){
    return rejectWithValue(error.response.data)
  }
})
export const register = createAsyncThunk("auth/register", async ({formValue, navigate,toast}, {rejectWithValue})=>{
  try{
    const res = await axios.post("http://localhost:5000/users/signup", formValue);
    toast.success("Registered successfully");
    console.log(res.data.result);
    navigate("/");
    return res.data.result
  }catch(error){
    return rejectWithValue(error.response.data)
  }
})
export const googleSignIn = createAsyncThunk("auth/googleSignIn", async ({result, navigate,toast}, {rejectWithValue})=>{
  try{
    const res = await axios.post("http://localhost:5000/users/googlesignin", result);
    toast.success("Google Signin successfully");
    navigate("/");
    console.log(res.data);
    return res.data

  }catch(error){
    return rejectWithValue(error.response.data)
  }
})


const authSlice = createSlice({
      name:"auth",
      initialState: {
            user: null,
            error: "",
            loading: false
      },
      reducers: {
            setUser: (state, action)=>{
                  state.user= action.payload
            },
            setLogout:(state,action)=>{
                  state.user=null;
                  localStorage.clear()
            }
      },
      extraReducers:{
            [login.pending]: (state, action)=>{
                  state.loading =true;
            },
            [login.fulfilled]:(state,action)=>{
                  state.loading=  false;
                  localStorage.setItem("profile",JSON.stringify({...action.payload}));
                  // console.log(action.payload)
                  state.user = action.payload
            },
            [login.rejected]:(state, action)=>{
                  state.loading = false;
                  state.error = action.payload.message;
            },
            [register.pending]: (state, action)=>{
                  state.loading =true;
            },
            [register.fulfilled]:(state,action)=>{
                  state.loading=  false;
                  localStorage.setItem("profile",JSON.stringify({...action.payload}));
                  console.log(JSON.stringify({...action.payload}))
                  state.user = action.payload
            },
            [register.rejected]:(state, action)=>{
                  state.loading = false;
                  state.error = action.payload.message;
            },
            [googleSignIn.pending]: (state, action)=>{
                  state.loading =true;
            },
            [googleSignIn.fulfilled]:(state,action)=>{
                  state.loading=  false;
                  localStorage.setItem("profile",JSON.stringify({...action.payload}));
                  state.user = action.payload
            },
            [googleSignIn.rejected]:(state, action)=>{
                  state.loading = false;
                  state.error = action.payload.message;
            },
            
      }
})
export const {setUser, setLogout} = authSlice.actions;
export default authSlice.reducer