import React from "react";
import { Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import "./LawyerSignup.css";

const LawyerSignup = () => {
  return (
    <div>
      <h1 className="text-uppercase text-center mt-5">Layer SignUp</h1>
      <div className="d-flex text-align-center justify-content-center  m-5">
          <form>
        <Row className="g-2">
            <Col md={6}>
              <FloatingLabel controlId="floatingInputGrid" label="First Name">
                <Form.Control type="text" placeholder="first name" />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="floatingInputGrid" label="Last Name">
                <Form.Control type="text" placeholder="last name" />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="floatingInputGrid" label="Username">
                <Form.Control type="text" placeholder="username" />
              </FloatingLabel>
            </Col>

            <Col mb={6}>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Email address"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Mobile Number"
              >
                <Form.Control type="text" placeholder="mobile number" />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Enrollment Number"
              >
                <Form.Control type="text" placeholder="enrollment number" />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
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
