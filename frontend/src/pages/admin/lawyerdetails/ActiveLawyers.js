import React, {useContext, useEffect} from 'react'
import { Table} from 'react-bootstrap'
import Avatar from '@mui/material/Avatar';
import { AdminContext } from '../../../context/AdminContext'

const ActiveLawyers = () => {
    const {getActiveLawyers,activeLawyers} = useContext(AdminContext)
    useEffect(() => {
        getActiveLawyers()
  } , [])


  return (
    <div>
         <h2>Active Lawyers</h2>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Username</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Enrollment No.</th>
    </tr>
  </thead>
  <tbody>
    {activeLawyers && activeLawyers.map((lawyer,index) => {
      return(
        <tr key={index}>
        <td><Avatar alt="Remy Sharp" src={lawyer && lawyer.lawyer_image} /></td>
        <td>{lawyer.lawyer.first_name} {lawyer.lawyer.last_name}</td>
        <td>@{lawyer.lawyer.username}</td>
        <td>{lawyer.lawyer.email}</td>
        <td>{lawyer.phone}</td>
        <td>{lawyer.enrollment_number}</td>
        <td> 
          {/* <div>
            <Button onClick={()=>{getLawyerProfile(lawyer.lawyer.id)}} variant="contained" startIcon={<VisibilityIcon/>}>
        </Button>
          </div> */}
        </td>
      </tr>
    )})}
    
  </tbody>
</Table>
    </div>
  )
}

export default ActiveLawyers