import React, {useContext, useEffect} from 'react'
import { Table} from 'react-bootstrap'
import Avatar from '@mui/material/Avatar';
import { AdminContext } from '../../../context/AdminContext'
import { Box, Skeleton } from '@mui/material';

const ActiveLawyers = () => {
    const {getActiveLawyers,activeLawyers,lawyerLoading} = useContext(AdminContext)
    useEffect(() => {
        getActiveLawyers()
  } , [])


  return (
    <>
         <h2>Active Lawyers</h2>
      {lawyerLoading === true ?
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

:
<div className='d-flex justify-content-center'>

<Box sx={{ width: 700 }} >
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
</div>
}
    </>
  )
}

export default ActiveLawyers