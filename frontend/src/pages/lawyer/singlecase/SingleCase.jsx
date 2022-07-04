import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LawyerHeader from '../../../components/lawyer/LawyerHeader'
import { ReadMore } from '../../police/ViewComplaint'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import { Button, Stack } from '@mui/material'
import { LawyerContext } from '../../../context/LawyerContext'
import ViewNoteModal from './ViewNoteModal'
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Footer from '../../../components/Footer'


const SingleCase = () => {
    
    const {singleComplaint,getSingleComplaint,singleCase,lawyerCaseAccept} = useContext(LawyerContext)

    const [singleLoader, setSingleLoader] = useState(true)
    const params = useParams()

    const callComplaint = async () => {
        await getSingleComplaint(params.id)
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
        <LawyerHeader/>

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
                            :<label className='label_value'>{singleCase && singleCase.complaint.people.people.first_name} {singleCase && singleCase.complaint.people.people.last_name}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">Email</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.complaint.people.people.email}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Phone</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.complaint.people.phone}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">DOB</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.userinfo?.dob}</label>
                        </Col>
                    </Col>



                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Gender</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.userinfo.gender}</label>
                        </Col>
                    </Col>

                    
                </Row>
            </Card.Body>
        </Card>

        <Card className='mb-3'>
            <Card.Body>
                <h2 >Complaint Information</h2>
                
                <Row>
                    <Col md={6} className="row mb-3   ms-2">
                        <Col md={6}>
                            <label className="label_name">Complaint Nature</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.complaint.complaint.complaint_nature}</label>
                        </Col>
                    </Col>
                    <Col md={6} className="row mb-3   ms-2">
                        <Col md={6}>
                            <label className="label_name">Complaint status/Case Status</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.complaint.complaint.complaint_status}/{singleCase && singleCase.complaint.case_status}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Place of Incident</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.complaint.complaint.incident_place}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Ref Number</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.complaint.complaint.ref_number}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Date of Incident</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase.complaint.complaint.incident_date ? (singleCase.complaint.complaint.incident_date).slice(0,10) : 'Unknown'}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">Description of Complaint</label>
                        </Col>
                        <Col md={6}>
                           
                            :<label>{singleCase && (singleCase.complaint.complaint.compalaint_description).substring(0,30)}.... </label>
                            <span><ReadMore description={singleCase && (singleCase.complaint.complaint.compalaint_description)} /></span>
                        </Col>
                    </Col>
                    
                    
                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">File Discription</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.complaint.complaint.file_discription}</label>          
                            </Col>
                    </Col>

                    <Col md={6} className="row mb-3  ms-2">
                        <Col md={6}>
                            <label className="label_name">File Discription</label>
                        </Col>
                        <Col md={6}>
                            : <a href={singleCase && singleCase.complaint.complaint.file_upload} target="_blank" rel="noopener">
                <Button className="btn-lg" variant="outlined">View Document</Button>
                </a>
                        </Col>
                    </Col>
                    
                </Row>
                <div className='mb-1 me-2'>

        <ViewNoteModal id={params.id}/>
        </div>
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
                            :<label>{singleCase && singleCase.userinfo.house_number}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">House Name</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.userinfo.house_name}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">Locality</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.userinfo.locality}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">Village</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.userinfo.village}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">Police Station</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.userinfo.police_station}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">Police District</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.userinfo.police_district}</label>
                        </Col>
                    </Col>


                    <Col md={6} className="row  ms-2">
                        <Col md={6}>
                            <label className="label_name">State</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.userinfo.state}</label>
                        </Col>
                    </Col>

                    <Col md={6} className="row ms-2">
                        <Col md={6}>
                            <label className="label_name">Pin Code</label>
                        </Col>
                        <Col md={6}>
                            :<label>{singleCase && singleCase.userinfo.pin_code}</label>
                        </Col>
                    </Col>
                    
                </Row>
            </Card.Body>
        </Card>
        <Stack direction="row" spacing={2} className="d-flex justify-content-center">
      <Button type="reset" variant="outlined" startIcon={<CloseIcon />}>
      Refuse
      </Button>
      <Button type="submit" onClick={() => {
        lawyerCaseAccept(singleCase.complaint.people.id,singleCase.consulten_fee,singleCase.complaint.complaint.id)
      }}   variant="contained" endIcon={<DoneIcon />}>
        Accept
      </Button>
    </Stack>
        </div>

    </div>
        )}
    </>
  )
}

export default SingleCase