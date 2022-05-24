import React from 'react'
import './UserLanding.css'
import Header from '../../components/Header'
import {Card,Button,Col, Row} from 'react-bootstrap'
import complante from '../../static/images/complaint.png'
import accepted from '../../static/images/accepted.jpeg'
import lawyer from '../../static/images/lawyer.jpg'
import fir from '../../static/images/fir.png'
import payment from '../../static/images/payment.png'
import faq from '../../static/images/faq.png'
import Footer from '../../components/Footer'

const UserLanding = () => {
  return (
    <div>
        <Header/>
<div className="">
    <Row className="d-flex justify-content-center">
      <Col sm={6} md={5} lg={4} className='p-3 d-flex justify-content-center'>
        <Card className="home_card" style={{ width: '18rem' }}>
          <div className='card_img'>
        <Card.Img className="home-img" variant="top" src={complante} />
          </div>
        <Card.Body>
            <Button className="home-btn" variant="outline-secondary">Register</Button>
        </Card.Body>
        </Card>
      </Col>

      <Col sm={6} md={5} lg={4} className='p-3 d-flex justify-content-center'>
        <Card className="home_card" style={{ width: '18rem' }}>
          <div className='card_img'>
        <Card.Img className="home-img" variant="top" src={accepted} />
          </div>
        <Card.Body>
            <Button className="home-btn" variant="outline-secondary">Accepted Case</Button>
        </Card.Body>
        </Card>
      </Col>

      <Col sm={6} md={5} lg={4} className='p-3 d-flex justify-content-center'>
        <Card className="home_card" style={{ width: '18rem' }}>
          <div className='card_img'>
        <Card.Img className="home-img" variant="top" src={lawyer} />
          </div>
        <Card.Body>
            <Button className="home-btn" variant="outline-secondary">View Lawyer</Button>
        </Card.Body>
        </Card>
      </Col>

    {/* </Row> 

    <Row className="d-flex justify-content-center"> */}
      <Col sm={6} md={5} lg={4} className='p-3 d-flex justify-content-center'>
        <Card className="home_card" style={{ width: '18rem' }}>
          <div className='card_img'>
        <Card.Img className="home-img" variant="top" src={fir} />
          </div>
        <Card.Body>
            <Button className="home-btn" variant="outline-secondary">F.I.R</Button>
        </Card.Body>
        </Card>
      </Col>

      <Col sm={6} md={5} lg={4} className='p-3 d-flex justify-content-center'>
        <Card className="home_card " style={{ width: '18rem' }}>
          
          <div className='card_img '>
            
        <Card.Img className="home-img " variant="top" src={payment} />
        
          </div>
        <Card.Body>
            <Button className="home-btn" variant="outline-secondary">Payment History</Button>
        </Card.Body>
        </Card>
      </Col>

      <Col sm={6} md={5} lg={4} className='p-3 d-flex justify-content-center'>
        <Card className="home_card" style={{ width: '18rem' }}>
          <div className='card_img'>
        <Card.Img className="home-img" variant="top" src={faq} />
          </div>
        <Card.Body>
            <Button className="home-btn" variant="outline-secondary">F.A.Q</Button>
        </Card.Body>
        </Card>
      </Col>
      
    </Row>  
    </div>
    <Footer/>
    </div>
  )
}

export default UserLanding