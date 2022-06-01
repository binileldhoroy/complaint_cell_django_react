import React,  { useContext, useEffect } from 'react'
import {Table,Button} from 'react-bootstrap'
import { AdminContext } from '../../../context/AdminContext'

const UserList = () => {

  const {getUsers,users,blockUser,unblockUser} = useContext(AdminContext)
  useEffect(() => {
    getUsers()
} , [])

  return (
    <div>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
      <th>Email</th>
      <th>Phone</th>
    </tr>
  </thead>
  <tbody>
    {users && users.map((user,index) => {
      return(
      <tr key={index}>
      <td>{user.people.first_name}</td>
      <td>{user.people.last_name}</td>
      <td>@{user.people.username}</td>
      <td>{user.people.email}</td>
      <td>{user.phone}</td>
      <td>
        {user.people.is_active  ? (
          <Button variant='outline-danger'   value={user.people.id} onClick={blockUser} className='w-100' >Block</Button>
        ):(
          <Button variant='outline-success'  value={user.people.id} onClick={unblockUser} className='w-100' >Unblock</Button>
        )}
      </td>
    </tr>
    )})}
    
  </tbody>
</Table>
    </div>
  )
}

export default UserList