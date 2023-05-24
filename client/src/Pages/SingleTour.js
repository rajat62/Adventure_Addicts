import React, { useEffect} from 'react'
import {MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon} from "mdb-react-ui-kit"
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import moment from "moment"
import {getRelatedTours, getTour} from "../Redux/feature/tourSlice"
import RelatedTour from '../components/RelatedTour'
const SingleTour = () => {

      const dispatch = useDispatch()
      const {tour, relatedTours} = useSelector((state)=>({...state.tour}))
      const {id} = useParams();
      const tags = tour?.tags;

      useEffect(() => {
            tags && dispatch(getRelatedTours(tags));
      }, [tags])
      


      useEffect(()=>{
            dispatch(getTour(id))
      }, [id])

  return (
    <>
      <MDBContainer>
            <MDBCard className='mb-3 mt-2'>
                  <MDBCardImage
                        position='top'
                        style={{width:"100%", maxHeight:"600px"}}
                        src={tour.imageFile}
                        alt={tour.title}
                  />
                  <MDBCardBody>
                        <h3 style={{textTransform: "capitalize"}}>{tour?.title}</h3>
                        <span>
                              <p className='text-start tourName'>
                                    Created By: {tour.name}
                              </p>
                        </span>
                        <div style={{float:"left", paddingBottom: ".8rem"}}>
                              <span className='text-start'>
                                    {tour && tour.tags && tour.tags.map((item)=> `#${item} `)}
                              </span>
                        </div>
                        <br/>
                        <MDBCardText className='text-start d-flex flex-row align-items-center mt-3 gap-2'>
                              <MDBIcon 
                              style={{float:"left",}}
                              
                              icon='calendar-alt'
                              size='lg'
                              />
                              <small className='text-muted'>
                                    {
                                          moment(tour.createdAt).fromNow()
                                    }
                              </small>
                        </MDBCardText>
                        <MDBCardText className='lead mb-0 text-start fs-5'>
                              {
                                    tour.description
                              }
                        </MDBCardText>
                  </MDBCardBody>
                  <RelatedTour relatedTours={relatedTours} tourId={id}/>
            </MDBCard>
      </MDBContainer>
    </>
  )
}

export default SingleTour