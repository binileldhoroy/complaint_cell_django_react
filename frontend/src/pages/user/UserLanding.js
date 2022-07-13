import React, { useContext } from "react";
import "./UserLanding.css";
import Header from "../../components/Header";
import { Card, Button, Col, Row } from "react-bootstrap";
import complante from "../../static/images/complaint.png";
import accepted from "../../static/images/accepted.jpeg";
import lawyer from "../../static/images/lawyer.jpg";
import fir from "../../static/images/fir.png";
import payment from "../../static/images/payment.png";
import chat from "../../static/images/chat.png";
import Footer from "../../components/Footer";
import { AuthContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const UserLanding = () => {
  const { userProfile, userInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="container">
        <Row className="d-flex justify-content-center">
          <Col
            sm={6}
            md={5}
            lg={4}
            className="p-3 d-flex justify-content-center"
          >
            <Card className="home_card" style={{ width: "18rem" }}>
              <div className="card_img">
                <Card.Img className="home-img" variant="top" src={complante} />
              </div>
              <Card.Body>
                <Link to="/mycomplaints">
                  <Button className="home-btn" variant="outline-secondary">
                    Complaint Register
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col
            sm={6}
            md={5}
            lg={4}
            className="p-3 d-flex justify-content-center"
          >
            <Card className="home_card" style={{ width: "18rem" }}>
              <div className="card_img">
                <Card.Img className="home-img" variant="top" src={accepted} />
              </div>
              <Card.Body>
                <Button 
                  onClick={() => {
                    navigate("/completed");
                  }}
                className="home-btn" variant="outline-secondary">
                  Accepted Case
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col
            sm={6}
            md={5}
            lg={4}
            className="p-3 d-flex justify-content-center"
          >
            <Card className="home_card" style={{ width: "18rem" }}>
              <div className="card_img">
                <Card.Img className="home-img" variant="top" src={lawyer} />
              </div>
              <Card.Body>
                <Button className="home-btn"
                 onClick={() => {
                  navigate("/lawyers");
                }}
                variant="outline-secondary">
                  View Lawyer
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* </Row> 

    <Row className="d-flex justify-content-center"> */}
          <Col
            sm={6}
            md={5}
            lg={4}
            className="p-3 d-flex justify-content-center"
          >
            <Card className="home_card" style={{ width: "18rem" }}>
              <div className="card_img">
                <Card.Img className="home-img" variant="top" src={fir} />
              </div>
              <Card.Body>
                <Button className="home-btn" variant="outline-secondary">
                  F.I.R
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col
            sm={6}
            md={5}
            lg={4}
            className="p-3 d-flex justify-content-center"
          >
            <Card className="home_card " style={{ width: "18rem" }}>
              <div className="card_img ">
                <Card.Img className="home-img " variant="top" src={payment} />
              </div>
              <Card.Body>
                <Button className="home-btn" onClick={() => {
                  navigate("/payment");
                }} variant="outline-secondary">
                  Payment History
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col
            sm={6}
            md={5}
            lg={4}
            className="p-3 d-flex justify-content-center"
          >
            <Card className="home_card" style={{ width: "18rem" }}>
              <div className="card_img">
                <Card.Img className="home-img" variant="top" src={chat} />
              </div>
              <Card.Body>
                <Button className="home-btn" variant="outline-secondary">
                  Chat
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserLanding;
