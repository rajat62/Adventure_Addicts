import React, {useState, useEffect} from 'react'
import "../App.css"

import{
      MDBCard,
      MDBCardBody,
      MDBValidation,
      MDBBtn,
      MDBValidationItem,
      MDBInput,
      MDBTextArea
} from "mdb-react-ui-kit"

import FileBase64 from 'react-filebase64';
import {useNavigate, useParams} from "react-router-dom"
import ChipInput from 'material-ui-chip-input'
import {useDispatch, useSelector} from "react-redux"
import { createTour, updateTour } from '../Redux/feature/tourSlice';
import {toast, ToastContainer} from "react-toastify"
const initialState = {
      title: "",
      description: "",
      tags: []
}

const AddEditTour = () => {

      const [tourData, setTourData] = useState(initialState);
      const {user} = useSelector((state)=> ({...state.auth}))
      const {error, loading, userTours} = useSelector((state)=> ({...state.tour}))

      const {title, description, tags} = tourData;
      const navigate = useNavigate();
      const {id} = useParams();
      const dispatch = useDispatch();

      const [tagError, setTagError] = useState(null);

      useEffect(()=>{
            if(id){
                  const singleTour = userTours.find((tour)=> tour._id===id);
                  setTourData({...singleTour});
            }
      }, [id])
      useEffect((error) => {
            error &&
              toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
              });
          }, [error]);
      // functions
      const handleClear= ()=>{
            setTourData({title: "",
            description: "",
            tags: []})
      }
      const handleSubmit= (e)=>{
            e.preventDefault();
            if(!tags.length){
                  setTagError("Please Provide Some Tags");
            }
            if(title && description &&tags){
                  const updatedTourData = {...tourData, name:user?.result?.name}
                  
                  if(!id){
                        dispatch(createTour({updatedTourData, navigate,toast}))
                  }else{
                        dispatch(updateTour({id, updatedTourData, toast, navigate}))
                  }
                  
                  handleClear();
            }
      }
      const onInputChange= (e)=>{
         const {name, value} = e.target;   
         setTourData({...tourData, [name]:value})
      }
      const handleAddTags= (tag)=>{
            setTagError(null)
            setTourData({...tourData, tags: [...tourData.tags, tag]})
      }
      const handleDeleteChip= (deleteTag)=>{
            setTourData({...tourData, tags: tourData.tags.filter((tag)=> tag!==deleteTag) })
      }
     


  return (
   <div style={{
      margin:"auto",
      padding:"15px",
      maxWidth: "450px",
      alignContent:"center",
      marginTop:"120px"
   }} className='container'>
      <MDBCard alignment='center'>
            <h5 className='mt-4'>{id? "Update Tour" : "Add Tour"}</h5>
            <MDBCardBody>
            <MDBValidation className='row g-3' onSubmit={handleSubmit} noValidate>
                  <div className='col-md-12'>
                        <MDBValidationItem feedback="Provide Title" invalid>
                              <MDBInput 
                                    placeholder='Enter Title' 
                                    type='text'
                                    value={title}
                                    name='title'
                                    onChange={onInputChange}
                                    className='form-control'
                                    required
                              />
                        </MDBValidationItem>
                  </div>
                  <div className='col-md-12'>
                        <MDBValidationItem feedback="Provide Description" invalid>
                              <MDBTextArea 
                                    placeholder='Enter Description' 
                                    type='text'
                                    value={description}
                                    name='description'
                                    onChange={onInputChange}
                                    className='form-control'
                                    required
                                    
                                    rows={4}
                              />
                        </MDBValidationItem>
                  </div>
                  <div className='col-md-12'> 
                  <ChipInput
                        name="tags"
                        variant='outlined'
                        placeholder='Enter Tag'
                        fullWidth
                        value={tags}
                        onAdd={(tag) => handleAddTags(tag)}
                        onDelete={(tag, index) => handleDeleteChip(tag, index)}
                  />
                  {
                        tagError &&  <div className='tagErrMsg'>{tagError}</div> 
                  }
                  </div>
                  <div className='d-flex justify-content-center'>
                  <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setTourData({ ...tourData, imageFile: base64})}      
                  />
                       
                  </div>
                  <div className='col-md-12'>
                        <MDBBtn style={{width:"100%"}}>
                              {
                                    id? "Update": "Submit"
                              }
                        </MDBBtn>
                        <ToastContainer />
                        <MDBBtn style={{width:"100%"}} className='mt-2' color='danger' onClick={handleClear}>
                              Clear
                        </MDBBtn>
                  </div>
            </MDBValidation>
            </MDBCardBody>
      </MDBCard>
   </div>
  )
}

export default AddEditTour