import React, { useContext, useEffect } from 'react'
import {Card, Col, Row } from 'react-bootstrap'
import Header from '../../../components/Header'
import './complaint.css'
import list_logo from '../../../static/images/complaint_list.png'
import { AiFillEye } from 'react-icons/ai'
import { AuthContext } from '../../../context/UserContext'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'


const MyComplaints = () => {

    const {myComplaints,getMyComplaints} = useContext(AuthContext)

    useEffect(() => {
        getMyComplaints()
    },[]);
  return (
    <>
    <Header/>
        <div className='container'>

            <div>
            <Stack spacing={2} direction="row" className="d-flex justify-content-end me-3 mt-2">
                <Link to='/register'>
                    <Button variant="contained" startIcon={<AddIcon/>} >New Complaint</Button>
                </Link>
    </Stack>
                <h2>Complaints</h2>
                
            </div>
            
           

            <div>
            <Card className='main_card'>
            <Card.Body>

            <div className='complaint_card'>
                {myComplaints && myComplaints.map((complaint,index) => {
                    return(
                        <Card className='complaint_card m-2' key={index}>
            <Card.Body>

               <Row>
                   <Col md={1}>
                   <div style={{maxWidth:'30px', height:'40px'}}>
                <Card.Img variant="top" className='img-fluid' src={list_logo} />
                </div>
                </Col>
                <Col md={11}>
                <div>
                    <Col md={12}>
                    <h5>{complaint && complaint.people.people.first_name} {complaint && complaint.people.people.last_name}</h5>
                    </Col>
                    <Col md={12}>
                        <Row className=''>
                            <div className='col-md-3' >
                            <span> Ref No</span>
                            <span>: {complaint && complaint.ref_number} </span>
                            </div>

                            <div className='col-md-3' >
                            <span> Requested Date </span>
                            <span>: {complaint && (complaint.requested_date).slice(0,10)}</span>
                            </div>

                            <div className='col-md-3' >
                            <span> Complaint Status </span>
                            <span>:{complaint && complaint.complaint_status}</span>
                            <span> Case Status </span>
                            <span>:{complaint && complaint.case_status}</span>
                            </div>


                            <div className='col-md-3' >
                            <Button className='list_view_btn' type="submit">
                                <AiFillEye/>
                            </Button>
                            
                            </div>
                        </Row>
                    </Col>
                </div>
                </Col>
               </Row>

            </Card.Body>
            </Card>
                    )
                })}
            
            </div>

            </Card.Body>
            </Card>
            </div>

        </div>
    </>
  )
}

export default MyComplaints