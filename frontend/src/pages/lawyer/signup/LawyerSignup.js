import React, {useContext} from "react";
import { Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import "./LawyerSignup.css";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { LawyerContext } from "../../../context/LawyerContext";


const schema = yup.object().shape({
  firstname: yup.string().required('This field is required!'),
  lastname: yup.string().required('This field is required!'),
  username: yup.string().min(3, "Username should contain 3 characters").required("Userame is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  enroll: yup.string().min(5,'Should Contain 5 characters').required("Email is required"),
  phone: yup.string().min(5,'Phone number is not valid').max(10,'Phone number is not valid'),
  password: yup.string().min(8, "Password should contain 8 characters").required("Password is required"),
  repassword: yup.string().oneOf([yup.ref("password"), null]),
  profile: yup.mixed().test('required', "You need to provide a file", (value) =>{
    return value && value.length
  } )

});



const LawyerSignup = (e) => {

    const {signUpLawyer, errorMsg, signUpError} = useContext(LawyerContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })


  return (
    <div>
      <h1 className="text-uppercase text-center mt-5">Layer SignUp</h1>
      <div className="d-flex text-align-center justify-content-center  m-5 container">
          <form onSubmit={handleSubmit(signUpLawyer)} encType="multipart/form-data">
        <Row className="g-2">
            <Col md={6}>
              <FloatingLabel controlId="floatingInputGrid" label="First Name">
                <Form.Control {...register('firstname')} type="text" placeholder="first name" />
              </FloatingLabel>
              <p style={{color:'red'}} >{errors.firstname?.message}</p>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="floatingInputGrid1" label="Last Name">
                <Form.Control {...register('lastname')} type="text" placeholder="last name" />
              </FloatingLabel>
              <p style={{color:'red'}} >{errors.lastname?.message}</p>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="floatingInputGrid2" label="Username">
                <Form.Control {...register('username')} type="text" placeholder="username" />
                <p style={{color:'red'}}>{errors.username?.message}{signUpError.username}</p>
              </FloatingLabel>
            </Col>

            <Col mb={6}>
              <FloatingLabel
                controlId="floatingInputGrid3"
                label="Email address"
              >
                <Form.Control {...register('email')} type="email" placeholder="name@example.com" />
              </FloatingLabel>
              <p style={{color:'red'}}>{errors.email?.message}</p>
            </Col>

            <Col md={6}>
              <FloatingLabel
                controlId="floatingInputGrid4"
                label="Mobile Number"
              >
                <Form.Control {...register('phone')} type="text" placeholder="mobile number" />
              </FloatingLabel>
              <p style={{color:'red'}}>{errors.phone?.message}</p>
            </Col>

            <Col md={6}>
              <FloatingLabel
                controlId="floatingInputGrid5"
                label="Enrollment Number"
              >
                <Form.Control {...register('enroll')} type="text" placeholder="enrollment number" />
              </FloatingLabel>
              <p style={{color:'red'}}>{errors.enroll?.message}</p>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="floatingPassword6" label="Password">
                <Form.Control {...register('password')} type="password" placeholder="Password" />
              </FloatingLabel>
              <p style={{color:'red'}}>{errors.password?.message}{signUpError.password}</p>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="floatingPassword7" label="Confirm Password">
                <Form.Control {...register('repassword')} type="password" placeholder="Confirm Password" />
              </FloatingLabel>
              <p style={{color:'red'}}>{errors.repassword && 'Password should Match!'}</p>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control {...register('profile')} type="file" />
              </Form.Group>
              <p style={{color:'red'}} >{errors.profile?.message}</p>
            </Col>
        </Row>
        <br/>
        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
          </form>
      </div>
    </div>
  );
};

export default LawyerSignup;
