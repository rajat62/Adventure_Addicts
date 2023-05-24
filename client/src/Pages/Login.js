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
  MDBValidationItem,
} from "mdb-react-ui-kit";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { googleSignIn, login } from "../Redux/feature/authSlice";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  useEffect(() => {
    error &&
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
  }, [error]);

  const initailState = {
    email: "",
    password: "",
  };

  const [formValue, setFormValue] = useState(initailState);
  const { email, password } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const googleSuccess = (res) => {
    const userObject = jwt_decode(res.credential);
    console.log(userObject);
    const { email, name } = userObject;
    const result = { email, name };
    dispatch(googleSignIn({ result, navigate, toast }));
  };
  const googleFailure = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
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
        <MDBIcon className="pt-4" icon="user-alt" size="2x" />
        <h5 className="pt-4">Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12 d-flex flex-column gap-4">
              <MDBValidationItem feedback="please provide your email" invalid>
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

              <MDBValidationItem
                feedback="please provide your password"
                invalid
              >
                <MDBInput
                  label="Password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>

              {/* google auth */}

              <GoogleOAuthProvider
                clientId={`${process.env.REACT_APP_CLIENTID}`}
              >
                <GoogleLogin
                  render={(renderProps) => (
                    <button
                      type="button"
                      className=""
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <MDBIcon icon="google" /> Sign in with google
                    </button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
                />
              </GoogleOAuthProvider>
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
              <ToastContainer />
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have account? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
