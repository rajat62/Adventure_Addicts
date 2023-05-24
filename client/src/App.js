import './App.css';
import {ToastContainer} from "react-toastify"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useEffect } from 'react';
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Header from './components/Header';

import { useDispatch } from 'react-redux';
import { setUser } from './Redux/feature/authSlice';
import AddEditTour from './Pages/AddEditTour';
import SingleTour from './Pages/SingleTour';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from "./components/PrivateRoute"
import NotFound from './Pages/NotFound';
import TagTours from './Pages/TagTours';
function App() {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(()=>{
    dispatch(setUser(user))
  },[])
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/tour/search" element={<Home/>}/>
          <Route path="/tour/tag/:tag" element={<TagTours/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/addtour" element={
            <PrivateRoute>
            <AddEditTour/>
          </PrivateRoute>   
          }/>
          <Route path="/edittour/:id" element={
            <PrivateRoute>
              <AddEditTour/>
            </PrivateRoute>          
          }/>
          <Route path="/tour/:id" element={<SingleTour/>}/>
          <Route path="/dashboard" element={
            <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>   
          }/>

          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
