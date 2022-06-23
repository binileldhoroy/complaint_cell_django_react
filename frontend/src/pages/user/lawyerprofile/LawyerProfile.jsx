import { Avatar } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Col, Form, FormControl, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../../../components/Header'
import { AuthContext } from '../../../context/UserContext';
import CaseModal from './CaseModal';

import './LawyerProfile.css';

const LawyerProfile = () => {

    const params = useParams();
    const {
        getLawyerProfile,
        lawyerProfile,
    } = useContext(AuthContext);

    const [lawyerloader, setLawyerLoader] = useState(true);
    const getProfile = async () => {
        await getLawyerProfile(params.id);
        setLawyerLoader(false);
    }

    useEffect(() => {
        getProfile();
    }, [])

  return (
    <div>
        <Header/>
        <div>
        {
          lawyerloader ?
        (

      <Spinner className="profile_loader" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
        ) 
        : (

            <div className="container mt-4 p-2 profile-container mb-2">
            <h2>Lawyer Profile</h2>
          <Row>
            <Col md={6} className="d-flex justify-content-center">
              <div className="p-1 avater-profile">
                <FormControl
                  className="crop_image d-none"
                  id="upload_image"
                  type="file"
                  name="crop_image"
                  required
                 
                  accept=".jpg,.jpeg,.png,"
                />
                <label htmlFor="upload_image">
                  <span className="profilepic__icon">
                    <Avatar
                      alt=""
                      src={lawyerProfile && lawyerProfile.profile.lawyer_id.lawyer_image }
                      sx={{ width: 200, height: 200 }}
                    />
                  </span>
                </label>
              </div>
            </Col>
            <Col md={6}>
              <Row>
                <Col md={3}>
                  <label htmlFor="floatingInputCustom">Name</label>
                </Col>
                <Col md={9}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      disabled
                      readOnly
                      value={(lawyerProfile && lawyerProfile.profile.lawyer_id.lawyer.first_name) +' '+ (lawyerProfile && lawyerProfile.profile.lawyer_id.lawyer.last_name) }
                      placeholder="Name"
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <label htmlFor="floatingInputCustom">Experience</label>
                </Col>
                <Col md={9}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      disabled
                      readOnly
                      value={(lawyerProfile && lawyerProfile.profile.experience)+' years'}
                      placeholder="Last Name"
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <label htmlFor="floatingInputCustom">Location</label>
                </Col>
                <Col md={9}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      disabled
                      readOnly
                      value={lawyerProfile && lawyerProfile?.office?.office_district}
                      placeholder="Location"
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <label htmlFor="floatingInputCustom">Court</label>
                </Col>
                <Col md={9}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      disabled
                      readOnly
                      value={lawyerProfile && lawyerProfile.profile.court}
                      placeholder="Court"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>


            <div className="mt-5">
              <h2>Profile</h2>
              <Row className='container'>

              <Col md={12} className="row my-2 profile_card">
                  <Col md={12} className='my-1'>
                    <b htmlFor="floatingInputCustom">Overview</b>
                  </Col>

                  <Col md={12} className='my-1'>
                    <label htmlFor="floatingInputCustom">{lawyerProfile && lawyerProfile.profile.description}</label>
                  </Col>

                </Col>

                <Col md={12} className="row my-2 profile_card">
                  <Col md={12} className='my-1'>
                    <b htmlFor="floatingInputCustom">Professional Experience</b>
                  </Col>

                  <Col md={12} className='my-1'>
                    <label htmlFor="floatingInputCustom">{(lawyerProfile && lawyerProfile.profile.experience)+' years'}</label>
                  </Col>

                </Col>



                <Col md={12} className="row my-2 profile_card">
                  <Col md={12} className='my-1'>
                    <b htmlFor="floatingInputCustom">Practice Area</b>
                  </Col>

                  <Col md={12} className='my-1'>
                    <label htmlFor="floatingInputCustom">
                        {lawyerProfile && lawyerProfile.profile.area_practice}
                    </label>
                  </Col>

                </Col>


                <Col md={12} className="row my-2 profile_card">
                  <Col md={12} className='my-1'>
                    <b htmlFor="floatingInputCustom">Education</b>
                  </Col>

                  <Col md={12} className='my-1'>
                    <label htmlFor="floatingInputCustom">
                        {lawyerProfile && lawyerProfile.profile.degree}
                    </label>
                  </Col>

                </Col>


                <Col md={12} className="row my-2 profile_card">
                  <Col md={12} className='my-1'>
                    <b htmlFor="floatingInputCustom">Language Proficiency</b>
                  </Col>

                  <Col md={12} className='my-1'>
                    <label htmlFor="floatingInputCustom">
                        {lawyerProfile && lawyerProfile.profile.language}
                    </label>
                  </Col>

                </Col>

                <Col md={12} className="row my-2 profile_card">
                  <Col md={12} className='my-1'>
                    <b htmlFor="floatingInputCustom">Cousulting Fee</b>
                  </Col>

                  <Col md={12} className='my-1'>
                    <label htmlFor="floatingInputCustom">
                        {lawyerProfile && lawyerProfile.office.consulten_fee}
                    </label>
                  </Col>

                </Col>

              </Row>
            </div>

<div>

            <CaseModal/>
</div>

        </div>
        )
        }
      </div>

    </div>
  )
}

export default LawyerProfile