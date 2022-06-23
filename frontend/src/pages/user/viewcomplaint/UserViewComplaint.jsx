import React, { useContext, useEffect, useState } from 'react'
import { Button, Stack } from '@mui/material'
import { Card, Col, Modal, Row, Spinner, Table } from 'react-bootstrap'
import { AuthContext } from '../../../context/UserContext'
import { ReadMore } from '../../police/ViewComplaint'
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'


const UserViewComplaint = () => {

    const {singleComplaint,singleComplaints} = useContext(AuthContext)

    const [singleLoader, setSingleLoader] = useState(true)
    const params = useParams()

    const callComplaint = async () => {
        await singleComplaints(params.id)
        setSingleLoader(false)
    }

    useEffect(() => {
        callComplaint()
    },[])

  return (
    <>
    {singleLoader ? (
        <Spinner animation="border" role="status" className='test_loader' />
        ) : (
 
    <div>
        
            <Header />
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
                            :<label className='label_value'>{singleComplaint && singleComplaint.complaint.people.people.first_name} {singleComplaint && singleComplaint.complaint.people.people.last_name}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">Email</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.complaint.people.people.email}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Phone</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.complaint.people.phone}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">DOB</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.personalinfo.dob}</label>
                        </Col>
                    </Col>



                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Gender</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.personalinfo.gender}</label>
                        </Col>
                    </Col>



                    

                   
                    
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
                            :<label>{singleComplaint && singleComplaint.complaint.complaint_nature}</label>
                        </Col>
                    </Col>
                    <Col md={6} className="row mb-3   ms-2">
                        <Col md={6}>
                            <label className="label_name">Complaint status/Case Status</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.complaint.complaint_status}/{singleComplaint && singleComplaint.complaint.case_status}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Place of Incident</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.complaint.incident_place}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Ref Number</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.complaint.ref_number}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Date of Incident</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint.complaint.incident_date ? (singleComplaint.complaint.incident_date).slice(0,10) : 'Unknown'}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Description of Complaint</label>
                        </Col>
                        <Col md={6}>
                           
                            :<label>{singleComplaint && (singleComplaint.complaint.compalaint_description).substring(0,30)}.... </label>
                            <span><ReadMore description={singleComplaint && (singleComplaint.complaint.compalaint_description)} /></span>
                        </Col>
                    </Col>
                    
                    
                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">File Discription</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.complaint.file_discription}</label>          </Col>
                    </Col>

                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">File Discription</label>
                        </Col>
                        <Col md={6}>
                            : <a href={singleComplaint && singleComplaint.complaint.file_upload} target="_blank" rel="noopener">
                <Button className="btn-lg" variant="outlined">View Document</Button>
                </a>
                        </Col>
                    </Col>
                    
                </Row>
            </Card.Body>
        </Card>


        <Card className='mb-3'>
            <Card.Body>
                <h2>Address</h2>
                <Row>
                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">House No</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.personalinfo.house_number}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">House Name</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.personalinfo.house_name}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">Locality</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.personalinfo.locality}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">Village</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.personalinfo.village}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">Police Station</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.personalinfo.police_station}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">Police District</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.personalinfo.police_district}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">State</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.personalinfo.state}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">Pin Code</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleComplaint && singleComplaint.personalinfo.pin_code}</label>
                        </Col>
                    </Col>
                    
                </Row>
            </Card.Body>
        </Card>
        </div>
        <Footer/>
    </div>
       )
    }
       </>
  )
}

export default UserViewComplaint