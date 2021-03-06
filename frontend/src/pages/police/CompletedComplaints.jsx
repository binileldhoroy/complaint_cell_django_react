import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import PoliceHeader from '../../components/police/PoliceHeader'
import {PoliceContext} from '../../context/PoliceContext'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import ComplaintModal from './ComplaintModal';
import { Box } from '@mui/system';
import { Skeleton } from '@mui/material';



const CompletedComplaints = () => {

    const {getCompletedComplaints,completedComplaints} = useContext(PoliceContext)
    const [complaintLoader,setComplaintLoader] = useState(true)
    const getComplaintFn = async () => {
        await getCompletedComplaints()
        setComplaintLoader(false)
    }
    useEffect(() => {
        getComplaintFn()
    },[])

  return (
    <div>
        <PoliceHeader/>
    {complaintLoader ? (
        <div className="d-flex justify-content-center">
            <Box sx={{ width: 600 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </div>)
          : (

        <div className="container mt-4 p-2 profile-container mb-2">
        <h2>Completed Complaints</h2>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>Ref No.</th>
      <th>Name</th>
      <th>Email</th>
      <th> Phone</th>
      <th>Complaint Nature</th>
      <th>Status</th>
      <th>Date of incident</th>
      <th>Incident Place</th>
      <th>View</th>
    </tr>
  </thead>
  <tbody>
    {completedComplaints && completedComplaints.map((completedComplaint,index) => {
        return(
            <tr key={index}>
                <td>{completedComplaint.ref_number}</td>
                <td>{completedComplaint.people.people.first_name} {completedComplaint.people.people.last_name}</td>
                <td>{completedComplaint.people.people.email}</td>
                <td>{completedComplaint.people.phone}</td>
                <td>{completedComplaint.complaint_nature}</td>
                <td>{completedComplaint.complaint_status}</td>
                <td>{completedComplaint.incident_date ? (completedComplaint.incident_date).slice(0,10): 'Unknown'}</td>
                <td>{completedComplaint.incident_place}</td>
                <td>
                    <ComplaintModal id={completedComplaint.id}/>
                </td>
            </tr>
        )
    })}
    
  </tbody>
</Table>
        </div>)
}
    </div>
  )
}

export default CompletedComplaints