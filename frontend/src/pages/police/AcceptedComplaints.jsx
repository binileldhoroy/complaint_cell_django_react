import React, { useContext, useEffect } from 'react'
import { Table } from 'react-bootstrap';
import {PoliceContext} from '../../context/PoliceContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import PoliceHeader from '../../components/police/PoliceHeader'

const AcceptedComplaints = () => {

    const {getAcceptedComplaint,viewAcceptedComplaint,acceptedSingleComplaint} = useContext(PoliceContext)
    useEffect(() => {
        getAcceptedComplaint()
    },[])

  return (
    <div>
        <PoliceHeader/>

        <div className="container mt-4 p-2 profile-container mb-2">
        <h2>Accepted Complaints</h2>
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
    {viewAcceptedComplaint && viewAcceptedComplaint.map((acceptedComplaint,index) => {
        return(
            <tr key={index}>
                <td>{acceptedComplaint.ref_number}</td>
                <td>{acceptedComplaint.people.people.first_name} {acceptedComplaint.people.people.last_name}</td>
                <td>{acceptedComplaint.people.people.email}</td>
                <td>{acceptedComplaint.people.phone}</td>
                <td>{acceptedComplaint.complaint_nature}</td>
                <td>{acceptedComplaint.case_status}</td>
                <td>{(acceptedComplaint.incident_date).slice(0,10)}</td>
                <td>{acceptedComplaint.incident_place}</td>
                <td>
          <Button onClick={() => acceptedSingleComplaint(acceptedComplaint.id)}  variant="contained" startIcon={<VisibilityIcon/>}>
      </Button>
                </td>
            </tr>
        )
    })}
    
  </tbody>
</Table>
        </div>


    </div>
  )
}

export default AcceptedComplaints