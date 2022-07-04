import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import Header from "../../../components/Header";
import { AuthContext } from "../../../context/UserContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AcceptedCases = () => {
  const { getAcceptedCase, acceptedCase, caseLoader, singleComplaints } =
    useContext(AuthContext);

  useEffect(() => {
    getAcceptedCase();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="container mt-4 p-2 profile-container mb-2">
        <h2>Accepted Complaints</h2>
        {caseLoader ? (
          <div className="d-flex justify-content-center">
            <Box sx={{ width: 600 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ref No.</th>
                <th>Name</th>
                <th>Email</th>
                <th> Phone</th>
                <th>Complaint Nature</th>
                <th>Status</th>
                <th>Date</th>
                <th>Incident Place</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {acceptedCase &&
                acceptedCase.map((accepted, index) => {
                  return (
                    <tr key={index}>
                      <td>{accepted.ref_number}</td>
                      <td>
                        {accepted.people.people.first_name}{" "}
                        {accepted.people.people.last_name}
                      </td>
                      <td>{accepted.people.people.email}</td>
                      <td>{accepted.people.phone}</td>
                      <td>{accepted.complaint_nature}</td>
                      <td>
                      {accepted.case_status}
                      { accepted.forwarded &&  <span > & <span style={{color:'#08a420'}}>Forwarded</span></span>}
                      </td>
                      <td>{accepted.requested_date.slice(0, 10)}</td>
                      <td>{accepted.incident_place}</td>
                      <td>
                        <Button
                          onClick={() => {
                            navigate(`/completed/${accepted.id}`);
                          }}
                          variant="contained"
                          startIcon={<VisibilityIcon />}
                        ></Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AcceptedCases;
