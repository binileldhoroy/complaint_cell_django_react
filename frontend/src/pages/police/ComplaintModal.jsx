import React, { useContext, useState } from 'react'
import { Button, Stack } from '@mui/material'
import { Card, Col, Modal, Row} from 'react-bootstrap'
import { PoliceContext } from '../../context/PoliceContext'
import './ViewComplaint.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ReadMore } from './ViewComplaint'

const ComplaintModal = ({id}) => {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const {viewComplaint,getViewComplaintModal} = useContext(PoliceContext)


    return (
      <>
        <Button onClick={ async () => { 
          await getViewComplaintModal(id)
           setLgShow(true)}}><VisibilityIcon/></Button>
          
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
         
           <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">

            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="container mt-4 p-2 profile-container mb-2">
        <h2>Complaint Info</h2>
        <Card className='mb-3'>
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

        </div>
          </Modal.Body>
        </Modal>
  
      </>
    );
}

export default ComplaintModal