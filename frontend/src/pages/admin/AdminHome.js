import React from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import { Card, Col, Row, ListGroup } from "react-bootstrap";
import "./AdminHome.css";
import { BiUser } from "react-icons/bi";
import { GoLaw } from "react-icons/go";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { Link } from "react-router-dom";
import empty from '../../static/gif/not-found.gif'

const AdminHome = ({children}) => {
  return (
    <>
      <style>{`body {background:#e5e5e5}`}</style>
      <div>
        <AdminHeader />

        <Row className=" ps-1 pt-5">
          <Col md={3}>
            <Card className="side_bar">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <br />
                  <Link to="/dashboard/user-list">
                    <BiUser /> User Manage
                  </Link>
                  <br />
                </ListGroup.Item>
                <ListGroup.Item>
                  <br />
                  <Link to="/dashboard/lawyer-list">
                    <GoLaw /> Lawyer Manage
                  </Link>
                  <br />
                </ListGroup.Item>
                <ListGroup.Item>
                  <br />
                  <Link to="/dashboard/police-list">
                    <GiPoliceOfficerHead /> Police Manage
                  </Link>
                  <br />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="content p-2">
            { children ? 
              children
             : <img src={empty}/>
            }
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdminHome;
