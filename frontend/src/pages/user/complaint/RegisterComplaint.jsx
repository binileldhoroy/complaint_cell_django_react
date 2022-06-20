import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import Header from '../../../components/Header'
import { LoginContext } from '../../../context/LoginContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddIcon from '@mui/icons-material/Add';
import MdDone from '@mui/icons-material/Done';
import { alpha, styled } from '@mui/material/styles';
import { red,green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { AuthContext } from '../../../context/UserContext';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Footer from '../../../components/Footer';
import SuccessPage from './SuccessPage';


const schema = yup.object().shape({
    complaint: yup.string().required('This field is required!'),
    place: yup.string().required('This field is required!'),
    psdistrict: yup.string().required('This field is required!'),
    psstation: yup.string().required('This field is required!'),
    description: yup.string().required('This field is required!').min(10,'Description must be at least 10 characters long!'),
  });


const RegisterComplaint = () => {
    const {getPoliceDistrict,policeDistrict,getPoliceStation,policeStation} = useContext(LoginContext)
    const {fileDescription,file} = useContext(AuthContext)
    useEffect(() => {
        getPoliceDistrict()
    },[])

    const GreenSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: green[600],
          '&:hover': {
            backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: green[600],
        },
      
        '& .MuiSwitch-switchBase': {
          color: red[600],
          '&:hover': {
            backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase + .MuiSwitch-track': {
          backgroundColor: red[600],
        },
        
      }));
      
      const label = { inputProps: { 'aria-label': 'Switch demo' } };
      const [dateChecked, setDateChecked] = useState(false);
      const {complaintRegister,attachError,setComplaintDate,setAttachError,complaintSuccess,complaintLoader} = useContext(AuthContext)

      const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    })
      

  return (
    <>
         <Header/>
         {complaintSuccess ? <SuccessPage/>:
         <>
        (<div className='container'>

            <div>
                <h4>Register Your Complaint</h4>
                
            </div>
            
           

            <div className='mt-3'>
            <Card className='main_card'>
            <Card.Body>
                <div>
                    <h4>Complaint Details</h4>
                </div>

                    <Form onSubmit={handleSubmit(complaintRegister)}>
                <Row>
                    <Col md={3}>
                    <Form.Label>Complaint Nature</Form.Label>
                    <Form.Select
                    {...register('complaint')}
                    aria-label="Default select example">
                    
                    <option value="Against Public">Against Public</option>
                    <option value="Against Organization">Against Organization</option>
                    <option value="Against Police Officer">Against Police Officer</option>
                    <option value="Against Publice Servent">Against Publice Servent</option>
                    <option value="Wild Life Case">Wild Life Case</option>
                    <option value="Against Department">Against Department</option>
                    <option value="CYBER CRIME">CYBER CRIME</option>
                    </Form.Select>
                    <p style={{color:'red'}} >{errors.complaint?.message}</p>
                    </Col>

                   
                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Place of Inciden</Form.Label>
                    
                        <Form.Control {...register('place')} type="text" placeholder="Place of Inciden" />
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.place?.message}</p>
                    </Col>


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Police District</Form.Label>
                        <Form.Select {...register('psdistrict')} aria-label="Default select example">
                    {policeStation && policeDistrict.map((district,index) => {
                        return(
                            <option key={index}
                            onClick={
                                () => getPoliceStation(district.id)
    
                            } 
                            value={district.police_district}>{district.police_district}</option>
                        )
                    })}
               
                    </Form.Select>
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.psdistrict?.message}</p>
                    </Col>


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Police Station</Form.Label>
                        <Form.Select {...register('psstation')} aria-label="Default select example">
                    {policeStation && policeStation.map((station,index) => {
                        return(
                            <option key={index} value={station.police_station}>{station.police_station}</option>
                        )
                    })}
               
                    </Form.Select>
                    </Form.Group>
                    <p style={{color:'red'}} >{errors.psstation?.message}</p>
                    </Col>


                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Is Date of Incident Known ?</Form.Label>
                        <GreenSwitch {...label} checked={dateChecked} onClick={(e) => setDateChecked(e.target.checked)}  />
                    </Form.Group>
                    </Col>

                    {dateChecked && (
                    <Col md={3}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Date of Incident</Form.Label>
                        <Form.Control type="date" onChange={ (e) => setComplaintDate(e.target.value)}/>
                    </Form.Group>
                    </Col>)}


                </Row>

                <Row className='mt-5'>
                    <Col md={3}>
                   <AttachModal />
                    </Col>
                    {attachError ? <p style={{color:'red'}} >{attachError}</p> : setAttachError('')}
                </Row>
                <Row className='mt-3'>
                    <Col md={3}>
                        { fileDescription &&
                    <Form.Label>File Description: <b>{fileDescription}</b> </Form.Label>

                    
                        }
                         { file &&
                    <Form.Label>File Name: <b>{file.name}</b></Form.Label>
                        }
                    </Col>
                </Row>

                <Row className='mt-5'>
                    <Col >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description of Complaint</Form.Label>
                    <Form.Control as="textarea" {...register('description')} rows={6} />
                </Form.Group>
                <p style={{color:'red'}} >{errors.description?.message}</p>
                    </Col>
                </Row>
                <Button type="submit" variant="primary">
                  {complaintLoader ?
                  <Spinner animation="border" size='sm' />
                  :
                  <MdDone/> }
                  Submit Complaint</Button>
            </Form>
            
            </Card.Body>
            </Card>
            </div>

        </div>)

        <Footer/>
        </>
                      }
    </>
  )
}

export default RegisterComplaint



function AttachModal() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {setFileDescription,setFile,setDescError,descError} = useContext(AuthContext)
    const [tempDesc,setTempDesc] = useState('')
    const [tempFile,setTempFile] = useState()
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
        <AddIcon/>Add Support Document
        </Button>
  
        <Modal
          size='lg'
          show={show}
          onHide={handleClose}
          keyboard={false}
        >
          <Modal.Header style={{backgroundColor:'#f8f9fa'}} closeButton>
            <Modal.Title >Attach support Files</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
                <Col className='row m-4 p-2'>
                <Col md={4}>
                    <label htmlFor="floatingInputCustom">Description</label>
                  </Col>
                  <Col md={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                      >
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        onChange={(e) => {
                            setTempDesc(e.target.value)
                            if (e.target.value.length <= 10 ) {
                                setDescError('Description must be atleast 10 characters')
                            }else{
                                setDescError('')
                            }
                        }}
                       
                      />
                    </Form.Group>
                    <p style={{color:'red'}} >{descError && descError}</p>
                  </Col>


                  <Col md={4}>
                    <label htmlFor="floatingInputCustom">Upload</label>
                  </Col>
                  <Col md={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="file"
                        onChange={(e) => setTempFile(e.target.files[0])}
                      />
                    </Form.Group>
                  </Col>
                </Col>
            </Row>         


          </Modal.Body>
          <Modal.Footer>
            <Button onClick={
                () => { 
                    if (tempDesc.length <= 10 ) {
                        setDescError('Description must be atleast 10 characters')
                    }else{
                        setDescError('')
                        setFileDescription(tempDesc)
                        setFile(tempFile)
                        handleClose()
                    }
            }
                
            }  variant="primary"><MdDone/> Attach</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }