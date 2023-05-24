import React from 'react'
import {MDBCard, MDBCardBody, MDBCardTitle,MDBCardImage, MDBCardText, MDBCardGroup, MDBBtn, MDBIcon, MDVToolTip, MDBTooltip} from "mdb-react-ui-kit"
import { Link } from 'react-router-dom'
import "../App.css";

import { useSelector, useDispatch } from 'react-redux';
import {likeTour} from "../Redux/feature/tourSlice"
const CardTour = ({imageFile, description, title, tags,_id, name, likes}) => {
      const dispatch =useDispatch();
      const {user} = useSelector((state)=>({...state.auth}))

      const userId = user?.result?._id;
      const excerpt = (string)=>{
            if(string.length >45){
                  string = string.substring(0, 45)+ "..."
            }
            return string;
      }
      console.log(likes)
      const Likes = ({likes})=>{
            if(likes.length >0){
                  return likes.find((like)=> like === userId) ?( 
                        
                        <>
                              <MDBIcon fas icon='thumbs-up' className='me-1'/>
                              &nbsp;
                              { likes.length >2 ?(
                                    <MDBTooltip tag="a"
                                    title={`You and ${likes.length-1} other likes`}>
                                          {
                                                likes.length
                                          }
                                    </MDBTooltip>
                                   ) :(
                                    `${likes.length} Like${likes.length>1 ? 's' :""}`
                                   )
                              }
                        </>
                  ):(
                        <>
                              <MDBIcon far icon="thumbs-up"/>
                              &nbsp;
                              {likes.length} {likes.length===1? "Like" : "Likes"}
                        </>
                  )
            }
            return (
                  <>
                        <MDBIcon far icon='thumbs-up' className='me-1'/>
                        &nbsp; Like
                  </>
            )
      }
      const handleLike = ()=>{
            
            dispatch(likeTour(_id))
      }

  return (
    <div>   
      <MDBCardGroup>
            <MDBCard className='h-100 mt-2 d-sm-flex' style={{maxWidth:"20rem"}}>
                  <MDBCardImage 
                  src={imageFile}
                  alt={title}
                  position="top"
                  style={{maxWidth:"100%", height:"180%"}}
                  />
                  <div className='top-left'>
                        {name}
                  </div>
                  <span className='text-start tag-card'>
                        {tags.map((item, index)=> {
                              return <Link to={`/tour/tag/${item}`} key={index}>
                                    #{item}
                              </Link>
                        })}
                        <MDBBtn 
                        style={{float:"right"}} 
                        tag="a"
                        color='none'
                        onClick={handleLike}
                        >
                              <Likes likes={likes}/>
                        </MDBBtn>
                  </span>
                  <MDBCardBody>
                        <MDBCardTitle className='text-start'>
                              {title}
                        </MDBCardTitle>
                        <MDBCardText className='text-start'>
                              {excerpt(description)}
                              <Link to={`/tour/${_id}`}
                              > Read More</Link>
                        </MDBCardText>
                  </MDBCardBody>
            </MDBCard>
      </MDBCardGroup>
    </div>
  )
}

export default CardTour