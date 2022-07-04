import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { AiFillEye } from 'react-icons/ai'
import LawyerHeader from '../../../components/lawyer/LawyerHeader'
import './LawyerHome.css'
import list_logo from '../../../static/images/complaint_list.png'
import leadaccepted from '../../../static/images/leadaccepted.jpeg'
import leads from '../../../static/images/leads.jpeg'
import { LawyerContext } from '../../../context/LawyerContext'
import SpinnerLoader from '../../../components/loader/SpinnerLoader'
import { useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
import noDataGif from '../../../static/gif/nodata.gif'


const LawyerHome = () => {

  const {lawyerAssignedComplaints,lawyerCases,acceptCaseCount} = useContext(LawyerContext)
  const [caseLoading, setCaseLoading] = useState(true)
  const navigate = useNavigate()

  const lawyerCaseFn = async () => {
    setCaseLoading(true)
    await lawyerAssignedComplaints()
    setCaseLoading(false)
  }
  useEffect(() => {
    lawyerCaseFn()
  }, [])

  return (
    <div>
      <LawyerHeader/>
        {caseLoading ? <SpinnerLoader/> :
      <div className="container">
        <Row className='lawyer_count d-flex justify-content-center'>
          <Col md={4} className='leads'>
          <div>
          <div style={{maxWidth:'40px', height:'40px'}} className='card_banner_log' >
                <Card.Img variant="top" className='img-fluid' src={leads} />
                </div>
               </div>
               <div className='ms-2'>

            <p>{lawyerCases.length}</p>
            <p className='lawyer_home_accepted' onClick={() => navigate('/lawyer/lawyer-home')}>New Leads</p>
               </div>
          </Col>

          <Col md={4} className='accepted ' >
            <div>
          <div style={{maxWidth:'40px', height:'40px'}} className='card_banner_log' >
                <Card.Img variant="top" className='img-fluid' src={leadaccepted} />
                </div>
               </div>
               <div className='ms-2'>

            <p>{acceptCaseCount}</p>
            <p className='lawyer_home_accepted' onClick={() => navigate('/lawyer/accepted')}>Accepted</p>
               </div>
          </Col>
        </Row>
        {lawyerCases && lawyerCases.length === 0 && <div className='empty_msg'>
                  <img src={noDataGif} alt="gif" />
                  </div>}


        {lawyerCases && lawyerCases.map((singlecasee,index) => {
          return(
            <div key={index}>

            <Card className='lawyer_complaint_card mt-4 m-2' >
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
        <h5>
        {singlecasee && singlecasee.people.people.first_name} {singlecasee && singlecasee.people.people.last_name}
        </h5>
        </Col>
        <Col md={12}>
            <Row className=''>
                <div className='col-md-3' >
                <span> Ref No</span>
                <span>:{singlecasee && singlecasee.complaint.ref_number} </span>
                </div>

                <div className='col-md-2' >
                <span> Requested Date </span>
                <span>: {singlecasee && (singlecasee.complaint.requested_date).slice(0,10)}</span>
                </div>

                <div className='col-md-3 ' >
                <span> Complaint Nature </span>
                <span>:{singlecasee && singlecasee.complaint.complaint_nature}</span>
                </div>

                <div className='col-md-2' >
                <span> Complaint Description </span>
                <span>:{singlecasee && singlecasee.complaint.compalaint_description}</span>
                </div>
                


                <div className='col-md-2' >
                <Button className='list_view_btn' onClick={() => {
                  navigate(`/lawyer/viewcase/${singlecasee && singlecasee.id}`)
                }} type="submit"
                >
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
</div>
          )
        })}

      </div>
      }
    </div>
  )
}

export default LawyerHome