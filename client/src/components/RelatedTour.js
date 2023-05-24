import React from 'react'
import { 
      MDBRow,
      MDBCol,
      MDBCardBody,
      MDBCardTitle,
      MDBCardText,
      MDBCard,
      MDBCardImage
} from 'mdb-react-ui-kit'

import { Link } from 'react-router-dom'
import {excerpt} from "../utility/index"

const RelatedTour = ({relatedTours, tourId}) => {
  return (
    <>
      {
            relatedTours && relatedTours.length> 0 && (
                  <>
                  {relatedTours.length>1 && <h4>Related Tours</h4>}
                  
                  <MDBRow className='row-col-1 row-col-md-3 g-4'>
                  {
                       
                       relatedTours.filter((item)=>{
                             return item._id !== tourId
                       }).splice(0, 3).map((item)=>{
                             return <MDBCol>
                                   <MDBCard>
                                         <Link to={`/tour/${item._id}`}>
                                         <MDBCardImage
                                               src={item.imageFile}
                                               alt={item.title}
                                               position='top'
                                         />
                                         </Link>   
                                         <span className='text-start tag-card'>
                                               {
                                                     item.tags.map((tag)=>{
                                                           return <Link to={`/tour/tag/${tag}`}>
                                                                       #{ tag}
                                                           </Link>
                                                     })
                                               }
                                         </span>
                                         <MDBCardBody>
                                               <MDBCardTitle className='text-start'>{item.title}</MDBCardTitle>
                                               <MDBCardText>{excerpt(item.description, 40)}</MDBCardText>
                                         </MDBCardBody>
                                   </MDBCard>
                             </MDBCol>
                       })
                 }
                  </MDBRow>
                  </>
            )
      }
    </>
  )
}

export default RelatedTour