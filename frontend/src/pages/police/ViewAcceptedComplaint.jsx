import React, { useContext, useState } from 'react'
import { Button, Stack } from '@mui/material'
import { Card, Col, Modal, Row, Table } from 'react-bootstrap'
import PoliceHeader from '../../components/police/PoliceHeader'
import { PoliceContext } from '../../context/PoliceContext'
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './ViewComplaint.css'

const ViewAcceptedComplaint = () => {
    const {viewComplaint,fileFir} = useContext(PoliceContext)

  return (
    <div>
        <PoliceHeader/>
        <div className="container mt-4 p-2 profile-container mb-2">
        <h2>Complaint Info</h2>
        <Card className='mb-3'>
        <Stack direction="row" spacing={2} className="d-flex justify-content-end me-3 mt-2">
      <AddNote/>
        <ViewNotes/>
    </Stack>
            <Card.Body>
                <h2>Profile Information</h2>
                <Row>
                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Name</label>
                        </Col>
                        <Col md={6}>
                            :<label className='label_value'>{viewComplaint && viewComplaint.complaint.people.people.first_name} {viewComplaint && viewComplaint.complaint.people.people.last_name}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">Email</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.complaint.people.people.email}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">Phone</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.complaint.people.phone}</label>
                        </Col>
                    </Col>

                    {/* <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label>Email</label>
                        </Col>
                        <Col md={6}>
                            :<label>athul@gmail.com</label>
                        </Col>
                    </Col> */}
                    
                </Row>
            </Card.Body>
        </Card>

        <Card className='mb-3'>
            <Card.Body>
                <h2>Complaint Information</h2>
                <Row>
                    <Col md={6} className="row mb-3   ms-2">
                        <Col md={6}>
                            <label className="label_name">Complaint Nature</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.complaint.complaint_nature}</label>
                        </Col>
                    </Col>
                    <Col md={6} className="row mb-3   ms-2">
                        <Col md={6}>
                            <label className="label_name">Complaint status/Case Status</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.complaint.complaint_status}/{viewComplaint && viewComplaint.complaint.case_status}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Place of Incident</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.complaint.incident_place}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Ref Number</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.complaint.ref_number}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Date of Incident</label>
                        </Col>
                        <Col md={6}>
                            :<label>{(viewComplaint && viewComplaint.complaint.incident_date).slice(0,10)}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Description of Complaint</label>
                        </Col>
                        <Col md={6}>
                           
                            :<label>{viewComplaint && (viewComplaint.complaint.compalaint_description).substring(0,30)}.... </label>
                            <span><ReadMore description={viewComplaint && (viewComplaint.complaint.compalaint_description)} /></span>
                        </Col>
                    </Col>
                    
                    
                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">File Discription</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.complaint.file_discription}</label>          </Col>
                    </Col>

                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">File Discription</label>
                        </Col>
                        <Col md={6}>
                            : <a href={viewComplaint && viewComplaint.complaint.file_upload} target="_blank" rel="noopener">
                <Button className="btn-lg" variant="outlined">View Document</Button>
                </a>
                        </Col>
                    </Col>
                    
                </Row>
            </Card.Body>
        </Card>


        <Card className='mb-3'>
            <Card.Body>
                <h2>Personal Information</h2>
                <Row>
                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">House No</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.personalinfo.house_number}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">House Name</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.personalinfo.house_name}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">Locality</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.personalinfo.locality}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">Village</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.personalinfo.village}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">Police Station</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.personalinfo.police_station}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">Police District</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.personalinfo.police_district}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">State</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.personalinfo.state}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">Pin Code</label>
                        </Col>
                        <Col md={6}>
                            :<label>{viewComplaint && viewComplaint.personalinfo.pin_code}</label>
                        </Col>
                    </Col>
                    
                </Row>

            </Card.Body>
        </Card>
                <Stack direction="row" spacing={2} className="d-flex justify-content-center">
      <Button type="submit" 
      onClick={ () => fileFir(viewComplaint.complaint.id)} 
      variant="contained" color="success" endIcon={<DoneIcon />}>
        File F.I.R
      </Button>
    </Stack>

       
        </div>
    </div>
  )
}

export default ViewAcceptedComplaint



function ReadMore({description}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button className='btn-sm' style={{color:'blue'}}  variant="primary" onClick={handleShow}>
          Read More
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Description of Complaint</Modal.Title>
          </Modal.Header>
          <Modal.Body>{description}</Modal.Body>
        </Modal>
      </>
    );
  }



  function ViewNotes() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
      <Button  variant="contained" onClick={handleShow} startIcon={<VisibilityIcon/>}>
          View Notes
      </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Notes On This Case</Modal.Title>
          </Modal.Header>
          <Modal.Body>


            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  

  function AddNote() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
      <Button type="reset" variant="outlined" onClick={handleShow} startIcon={<AddIcon/>}>
        Add Note
      </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I will not close if you click outside me. Don't even try to press
            escape key.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  