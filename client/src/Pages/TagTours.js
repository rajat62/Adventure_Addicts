import {useEffect} from 'react'
import {
      MDBCard,
      MDBCardTitle,
      MDBCardText,
      MDBCardBody,
      MDBCardImage,
      MDBRow,
      MDBCol,
      MDBBtn,
      MDBCardGroup
} from "mdb-react-ui-kit"

import {useParams, useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner"
import {useDispatch, useSelector} from 'react-redux'
import {getToursByTag} from "../Redux/feature/tourSlice"
import {excerpt} from "../utility/index"

const TagTours = () => {

      const dispatch = useDispatch();
      const navigate = useNavigate();
      const {tagTours, loading} = useSelector((state)=>({...state.tour}))
      const {tag} = useParams();

      useEffect(()=>{
            if(tag){
                  dispatch(getToursByTag(tag));
            }
      }, [tag])

      if(loading){
            return <Spinner/>
      }

      
  return (
    <div style={{
      margin:"auto",
      padding:"120px",
      maxWidth:"900px",
      alignContent:"center"
    }}>
      <h3 className='text-center'>Tours with tag: {tag}</h3>
      <hr style={{maxWidth:"570px"}}/>
      {
            tagTours && tagTours.map((item)=>{
                  return <MDBCardGroup key={item._id} className='mb-3'>
                        <MDBCard style={{maxWidth:"600px"}}>
                              <MDBRow className='g-0'>
                                    <MDBCol md={4}>
                                          <MDBCardImage
                                                className='rounded'
                                                src={item.imageFile}
                                                alt={item.title}
                                                fluid
                                          />
                                    </MDBCol>
                                    <MDBCol md={8}>
                                          <MDBCardBody>
                                                <MDBCardTitle className='text-start'>{item.title}</MDBCardTitle>
                                                <MDBCardText className='text-start' style={{textTransform:"capitalize"}}>{excerpt(item.description, 40)}</MDBCardText>
                                                <MDBCardText style={{float:"left", marginTop:"-10px", marginBottom:"10px"}}>
                                                      <MDBBtn size='sm' rounded color='info' onClick={()=> navigate(`/tour/${item._id}`)}>
                                                            Read More
                                                      </MDBBtn>
                                                </MDBCardText>
                                          </MDBCardBody>
                                    </MDBCol>
                              </MDBRow>
                        </MDBCard>
                  </MDBCardGroup>
            })
      }
    </div>
  )
}

export default TagTours