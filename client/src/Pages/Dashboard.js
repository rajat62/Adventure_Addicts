import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getToursByUser, deleteTour } from "../Redux/feature/tourSlice";
import Spinner from "../components/Spinner";
import  {toast} from "react-toastify"
const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [userId]);

  const excerpt = (string) => {
    if (string.length > 45) {
      string = string.substring(0, 40) + "...";
    }
    return string;
  };

if(loading){
  return <Spinner className="mt-5"/>
}

  const handleDelete  = (id)=>{
    if(window.confirm("Are you sure you want to delete this tour")){
      dispatch(deleteTour({id, toast}))
    }
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <h4 style={{ textTransform: "capitalize" }} className="text-center">
        Dashboard: {user?.result?.name}
      </h4>
      <hr style={{ maxWidth: "570px" }} />

      {userTours &&  userTours.map((item) => {

          return <MDBCardGroup key={item._id}>
            <MDBCard
              style={{ maxWidth: "600x" }}
              
              className="mt-2"
            >
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    src={item.imageFile}
                    className="rounded"
                    alt={item.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                        {excerpt(item.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon fas icon="trash"
                        style={{color:"#dd4b39"}} 
                        size="lg"
                        onClick={()=> handleDelete(item._id)}
                        />
                      </MDBBtn>
                      <Link to={`/edittour/${item._id}`}>
                        <MDBIcon fas icon="edit"
                        style={{color:"#55acee", marginLeft:"10px"}} 
                        size="lg"
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>;
        })}
    </div>
  );
};

export default Dashboard;
