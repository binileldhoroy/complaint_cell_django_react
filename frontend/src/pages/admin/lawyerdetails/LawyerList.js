import React, { useContext, useEffect ,useState} from 'react'
import { Link } from 'react-router-dom';
import './LawyerList.css'
import { AdminContext } from '../../../context/AdminContext';
import { Table, Modal,Row,Col} from 'react-bootstrap'
import Avatar from '@mui/material/Avatar';
import { AiFillEye } from "react-icons/ai";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



const LawyerList = () => {
  const {getLawyers,lawyers,getLawyerProfile} = useContext(AdminContext)

  useEffect(() => {
    getLawyers()
  },[])

  return (
    <div>
      <h2>Registred Lawyer List</h2>
      <Table striped bordered hover className='lawyer_list'>
  <thead>
    <tr>
      <th>Avater</th>
      <th>Name</th>
      <th>Username</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Enrollment Number</th>
      <th>View</th>
    </tr>
  </thead>
  <tbody>
    {lawyers && lawyers.map((lawyer,index) => {
      return(
      <tr key={index}>
      <td><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></td>
      <td>{lawyer.lawyer.first_name} {lawyer.lawyer.last_name}</td>
      <td>@{lawyer.lawyer.username}</td>
      <td>{lawyer.lawyer.email}</td>
      <td>{lawyer.phone}</td>
      <td>{lawyer.enrollment_number}</td>
      <td><Example lawyerId={lawyer.lawyer.id} /></td>
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

export default LawyerList


function Example({lawyerId}) {
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
console.log(lawyerId);
const {getLawyerProfile, lawyerProfile,hireLawyer} = useContext(AdminContext)
// useEffect(() => {
//   getLawyerProfile(lawyerId)
// },[])
  return (
    <>
      <Button onClick={ async () => { 
        await getLawyerProfile(lawyerId)
         setLgShow(true)}}><VisibilityIcon/></Button>
        
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
       
         <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          {lawyerProfile && lawyerProfile.status === 'incomplete' ? 
        <div>
          <h2>Profile Incomplete</h2>
        </div>
        :
          <Avatar className=" align-items-center"
  alt="Remy Sharp"
  src="/static/images/avatar/1.jpg"
  sx={{ width: 100, height: 100 }}
/>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {lawyerProfile && lawyerProfile.status == 'incomplete' ? 
        <div>
          <h2>Profile Incomplete</h2>
        </div>
        :
          (<Row>
            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={lawyerProfile && lawyerProfile.lawyer_id && lawyerProfile.lawyer_id.lawyer.username}
          InputProps={{
            readOnly: true,
          }}
        />
        </Col>

            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={lawyerProfile && lawyerProfile.lawyer_id && lawyerProfile.lawyer_id.lawyer.first_name + " " + lawyerProfile && lawyerProfile.lawyer_id && lawyerProfile.lawyer_id.lawyer.last_name}
          InputProps={{
            readOnly: true,
          }}
        />
            </Col>

            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={lawyerProfile && lawyerProfile.lawyer_id && lawyerProfile.lawyer_id.lawyer.email}
          InputProps={{
            readOnly: true,
          }}
        />
            </Col>

            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={lawyerProfile && lawyerProfile.lawyer_id && lawyerProfile.lawyer_id.phone}
          InputProps={{
            readOnly: true,
          }}
        />
            </Col>

            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={ lawyerProfile.lawyer_id && lawyerProfile.lawyer_id.enrollment_number}
          InputProps={{
            readOnly: true,
          }}
        />
            </Col>

        <h2>Personal Information</h2>

            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={lawyerProfile.gender}
          InputProps={{
            readOnly: true,
          }}
        />
            </Col>

            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={lawyerProfile.degree}
          InputProps={{
            readOnly: true,
          }}
        />
            </Col>

            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={lawyerProfile.area_practice}
          InputProps={{
            readOnly: true,
          }}
        />
            </Col>

            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={lawyerProfile.bar_name}
          InputProps={{
            readOnly: true,
          }}
        />
            </Col>

            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={lawyerProfile.court}
          InputProps={{
            readOnly: true,
          }}
        />
            </Col>

            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={lawyerProfile.description}
          InputProps={{
            readOnly: true,
          }}
        />
            </Col>

            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={lawyerProfile.experience}
          InputProps={{
            readOnly: true,
          }}
        />
            </Col>

            <Col md={4} className="p-2">
            <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={lawyerProfile.language}
          InputProps={{
            readOnly: true,
          }}
        />
            </Col>

            <Col md={4} className="p-2">
              <a href={lawyerProfile.file_cv} target="_blank">
              <Button className="btn-lg" variant="outlined">View CV</Button>
              </a>
            </Col>
            
            <Col>

<Button variant="contained" onClick={() => hireLawyer(lawyerId)}  color="success">
  Hire Lawyer
</Button>
            </Col>
          </Row>
          )

}
        </Modal.Body>
      </Modal>

    </>
  );
}


