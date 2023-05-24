import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBIcon,
  MDBValidationItem
} from "mdb-react-ui-kit";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {register} from "../Redux/feature/authSlice"
const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, error} = useSelector((state)=> ({...state.auth}))

  useEffect(()=>{
    error && toast.error(error, {
      position: toast.POSITION.TOP_RIGHT
  });
  }, [error])

  const initailState = {
    firstName:"",
    lastName:"",
    email: "",
    password: "",
    confirmPassword:""
  };

  const [formValue, setFormValue] = useState(initailState);
  const { email, password, firstName, lastName, confirmPassword } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      toast.error("password should match", {
        position: toast.POSITION.TOP_RIGHT
    })
  }
    else if(email && password && firstName && lastName && confirmPassword){
      dispatch(register({formValue, navigate, toast}));
    }
  };
  const onInputChange = (e) => {
    let {name, value} = e.target;
    setFormValue({...formValue, [name]:value})
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
      <MDBIcon fas icon="user-alt" size="2x"className="pt-4"/>
        <h5 className="pt-4">Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6 d-flex flex-row gap-4 w-100">
                <MDBValidationItem feedback="First name required" invalid>
                <MDBInput
                  label="First Name"
                  type="firstName"
                  value={firstName}
                  name="firstName"
                  onChange={onInputChange}
                  required
                  
                  />
                </MDBValidationItem>
                <MDBValidationItem feedback="Last name required" invalid>
                <MDBInput
                  label="Last Name"
                  type="lastName"
                  value={lastName}
                  name="lastName"
                  onChange={onInputChange}
                  required
                  />
                </MDBValidationItem>
              
            </div>
            <div className="col-md-12 d-flex flex-column gap-4">
              <MDBValidationItem feedback="Email required" invalid>
                <MDBInput
                  label="Email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={onInputChange}
                  required
                  // className="mb-3"
                  />
                </MDBValidationItem>
              
              <MDBValidationItem feedback="Password required" invalid>  
                <MDBInput
                  label="Password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={onInputChange}
                  required
                  
                />
              </MDBValidationItem>
              <MDBValidationItem feedback="Confirm password required" invalid>  
                <MDBInput
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={onInputChange}
                  required
                  
                />
              </MDBValidationItem>
            </div>
            <div className="col-12">
              <MDBBtn style={{width: "100%"}} className="mt-2">
                  {
                    loading &&(
                      <MDBSpinner
                        size="sm"
                        role="status"
                        tag="span"
                        className="me-2"

                      />
                    )
                  }
                  Register
              </MDBBtn>
              <ToastContainer />
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have account? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
