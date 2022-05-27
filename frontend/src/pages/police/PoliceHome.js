import React from 'react'
import Footer from '../../components/Footer'
import PoliceHeader from '../../components/police/PoliceHeader'
import { Card, Col,Row, Button} from 'react-bootstrap'

import './PoliceHome.css'
import card1 from '../../static/images/complaint.png'
import card2 from '../../static/images/accepted.jpeg'
import card3 from '../../static/images/completed.png'



const PoliceHome = () => {
  return (
    <div>
        <PoliceHeader/>

        <Row className="d-flex justify-content-center">
      <Col sm={6} md={5} lg={4} className='p-3 d-flex justify-content-center'>
        <Card className="policehome_card" style={{ width: '18rem' }}>
          <div className='policecard_img'>
        <Card.Img className="policehome-img" variant="top" src={card1} />
          </div>
        <Card.Body className='d-flex align-items-end mb-5'>
            <Button className="policehome-btn" variant="outline-secondary">New Complaints</Button>
        </Card.Body>
        </Card>
      </Col>

      <Col sm={6} md={5} lg={4} className='p-3 d-flex justify-content-center'>
        <Card className="policehome_card" style={{ width: '18rem' }}>
          <div className='policecard_img'>
        <Card.Img className="policehome-img" variant="top" src={card2} />
          </div>
        <Card.Body className='d-flex align-items-end mb-5'>
                <Button className="policehome-btn" variant="outline-secondary">Accepted Case</Button>
        </Card.Body>
        </Card>
      </Col>

      <Col sm={6} md={5} lg={4} className='p-3 d-flex justify-content-center'>
        <Card className="policehome_card" style={{ width: '18rem' }}>
          <div className='policecard_img'>
        <Card.Img className="policehome-img" variant="top" src={card3} />
          </div>
        <Card.Body className='d-flex align-items-end mb-5'>
            <Button className="policehome-btn" variant="outline-secondary">Completed Cases</Button>
        </Card.Body>
        </Card>
      </Col>
      </Row>

        <Footer/>
    </div>
  )
}

export default PoliceHome