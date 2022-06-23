import React, { useContext, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import PoliceHeader from '../../components/police/PoliceHeader'
import {PoliceContext} from '../../context/PoliceContext'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';



const NewComplaints = () => {

    const {newcomplaints,getNewcomplaints} = useContext(PoliceContext)
    useEffect(() => {
        getNewcomplaints()
    },[])

    const navigate = useNavigate()

  return (
    <div>
        <PoliceHeader/>
        <div className="container mt-4 p-2 profile-container mb-2">
        <h2>New Complaints</h2>
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
    {newcomplaints && newcomplaints.map((newcomplaint,index) => {
        return(
            <tr key={index}>
                <td>{newcomplaint.ref_number}</td>
                <td>{newcomplaint.people.people.first_name} {newcomplaint.people.people.last_name}</td>
                <td>{newcomplaint.people.people.email}</td>
                <td>{newcomplaint.people.phone}</td>
                <td>{newcomplaint.complaint_nature}</td>
                <td>{newcomplaint.complaint_status}</td>
                <td>{newcomplaint.incident_date ? (newcomplaint.incident_date).slice(0,10): 'Unknown'}</td>
                <td>{newcomplaint.incident_place}</td>
                <td>
          <Button onClick={() => navigate(`/police/viewcomplaint/${newcomplaint.id}`)} variant="contained" startIcon={<VisibilityIcon/>}>
      </Button>
                </td>
            </tr>
        )
    })}
    
  </tbody>
</Table>
        </div>
        {/* <Footer/> */}
    </div>
  )
}

export default NewComplaints