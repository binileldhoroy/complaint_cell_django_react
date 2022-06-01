import React, {useContext,useEffect} from 'react'
import { AdminContext } from '../../../context/AdminContext'
import { Table } from 'react-bootstrap'


const PoliceList = () => {

  const {getPoliceStation,policeInfo} = useContext(AdminContext)

  useEffect(() => {
    getPoliceStation()
  },[])

  return (
    <div>
      <h2>Police Station List</h2>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>Username</th>
      <th>Email</th>
      <th>Station District</th>
      <th>Station Place</th>
      <th>Officer Incharge</th>
      <th>Officer Position</th>
      <th>Phone</th>
    </tr>
  </thead>
  <tbody >
    {policeInfo && policeInfo.map((police,index) => {
      return(
        <tr key={index}>
        <td>{police.police.username}</td>
        <td>{police.police.email}</td>
        <td>{police.ps_district}</td>
        <td>{police.ps_place}</td>
        <td>{police.officer_incharge}</td>
        <td className='text-uppercase'>{police.officer_position}</td>
        <td>{police.phone}</td>
      </tr>
    )})}
    
  </tbody>
</Table>
    </div>
  )
}

export default PoliceList