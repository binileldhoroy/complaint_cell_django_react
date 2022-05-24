import React from 'react'
import './UserHome.css'
import {Carousel, Card, Col,Row} from 'react-bootstrap'

import bn1 from '../../static/images/bn1.jpg'
import bn2 from '../../static/images/bn2.jpg'
import card1 from '../../static/images/card1.jpeg'
import card2 from '../../static/images/card2.png'
import card3 from '../../static/images/card3.png'
import bg1 from '../../static/images/bg1.jpg'
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function UserHome() {
  return (
    <div style={{background:`url(${bg1})`}}>
        
  
  <Header/>
      {/* carousel  */}

  <Carousel className="carousel-img" >
  <Carousel.Item interval={5000}>
    <img
      className="d-block w-100"
      src="https://www.bis.gov.in/wp-content/uploads/2018/11/online-complaint-1.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Citizen Services</h3>
      <p>Now all Police Services on your finger tips</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={5000}>
    <img
      className="d-block w-100"
      src={bn1}
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>The Hand yoU Need for Assistance</h3>
      <p>We are here to serve you
Inauguration
Online Citizen Services of Kerala Police
Citizen Services
Now all Police Services on your finger tips
Stay home and be safe
Avail citizen services from Home
The Hand yoU Need for Assistance
We are here to serve you</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={bn2}
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
<br/>
 {/* carousel ends */}

 <Row  className='p-3 m-0'>
   <Col md={4} className='p-3 '>
  <Card className='card-home' >
    <Card.Img className='card-img' variant="top" src={card2} />
    <Card.Body>
      <Card.Title className='title'>COMPLAINT</Card.Title>
      <Card.Text className='text_dark'>
        Documents Required <br/>
        Steps to download
      </Card.Text>
    </Card.Body>
  </Card>
   </Col>
   <Col md={4} className='p-3 '>
  <Card className='card-home'>
    <Card.Img className='card-img' variant="top" src={card3} />
    <Card.Body>
      <Card.Title className='title'>F.I.R Download</Card.Title>
      <Card.Text className='text_dark'>
      Documents Required <br/>
        Steps to download
      </Card.Text>
    </Card.Body>  
  </Card>
  </Col>
  <Col md={4} className='p-3 '>
  <Card className='card-home'>
    <Card.Img className='card-img'  variant="top" src={card1}/>
    <Card.Body>
      <Card.Title className='title'>View Lawyers</Card.Title>
      <Card.Text className='text_dark'>
      Documents Required <br/>
        Steps to download
      </Card.Text>
    </Card.Body>
  </Card>
  </Col>

</Row>

<Footer/>

    </div>
  )
}

export default UserHome