import { Button, Input } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import Header from '../../../components/Header'
import { LoginContext } from '../../../context/LoginContext'

const RegisterComplaint = () => {
    const {getPoliceDistrict,policeDistrict,getPoliceStation,policeStation} = useContext(LoginContext)
    useEffect(() => {
        getPoliceDistrict()
    },[])

  return (
    <>
         <Header/>
        <div className='container'>

            <div>
                <h4>Register Your Complaint</h4>
                
            </div>
            
           

            <div className='mt-3'>
            <Card className='main_card'>
            <Card.Body>
                <div>
                    <h4>Complaint Details</h4>
                </div>

                    <Form>
                <Row>
                    <Col md={3}>
                    <Form.Label>Complaint Nature</Form.Label>
                    <Form.Select aria-label="Default select example">
                    <option>Select...</option>
                    <option value="Against Public">Against Public</option>
                    <option value="Against Organization">Against Organization</option>
                    <option value="Against Police Officer">Against Police Officer</option>
                    <option value="Against Publice Servent">Against Publice Servent</option>
                    <option value="Wild Life Case">Wild Life Case</option>
                    <option value="Against Department">Against Department</option>
                    <option value="CYBER CRIME">CYBER CRIME</option>
                    </Form.Select>
                    </Col>

                   
                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Place of Inciden</Form.Label>
                        <Form.Control type="text" placeholder="Place of Inciden" />
                    </Form.Group>
                    </Col>


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Police District</Form.Label>
                        <Form.Select onChange={
                            (e) => getPoliceStation(e.target.value)
                        } aria-label="Default select example">
                        <option>Select...</option>
                    {policeStation && policeDistrict.map((district,index) => {
                        return(
                            <option key={index} value={district.id}>{district.police_district}</option>
                        )
                    })}
               
                    </Form.Select>
                    </Form.Group>
                    </Col>


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Police Station</Form.Label>
                        <Form.Select aria-label="Default select example">
                    {policeStation && policeStation.map((station,index) => {
                        return(
                            <option key={index} value={station.id}>{station.police_station}</option>
                        )
                    })}
               
                    </Form.Select>
                    </Form.Group>
                    </Col>



                </Row>

                <Row className='mt-5'>
                    <Col md={3}>
                    <label htmlFor="contained-button-file">
                    <Input className='d-none' accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button variant="contained" component="span">
                    Add Support Document
                    </Button>
                </label>
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <Col >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description of Complaint</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                    </Col>
                </Row>
            </Form>
            
            </Card.Body>
            </Card>
            </div>

        </div>
    </>
  )
}

export default RegisterComplaint